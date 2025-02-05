#!/bin/bash

deployItch() {
	# Configure butler version to download see https://broth.itch.ovh/butler
	butlerChannel="${machine,,}-amd64" #darwin-amd64 for Mac and linux-amd64 for Linux
	butlerVersion="15.21.0"
	if [ "$machine" == "Linux" ]; then
		butlerFile="butler"
	else
		butlerFile="butler.exe"
	fi
	
	mkdir $tools/butler -p
	
	if [ ! -d "$tools/butler/$butlerVersion/$machine" ]; then
	    curl -L -o $tools/downloads/butler.zip https://broth.itch.ovh/butler/$butlerChannel/$butlerVersion/archive/default
	    mkdir $tools/butler/$butlerVersion -p
	    unzip -o $tools/downloads/butler.zip -d $tools/butler/$butlerVersion/$machine
	else
	    echo "Butler version $butlerVersion ($butlerChannel) already downloaded"
	fi
	
	# Make the downloaded file executable
	if [ "$machine" == "Linux" ]; then
		chmod +x $tools/butler/$butlerVersion/$machine/$butlerFile
	fi
	
	# Link to the butler tool
	butler="$tools/butler/$butlerVersion/$machine/$butlerFile"
	
	# Deploy to the main project for releases and to the designated project for the build otherwise
	butlerProject="aura-dev/$itchBaseProject"

	# Deploy to itch.io
	echo "Starting deployment to itch.io, target is $butlerProject ..."
	./$butler login

	if [[ "$build" == "Release" ]]; then	
		./$butler push $output/$targetFolder-windows.zip $butlerProject:windows --userversion $gameVersion
		./$butler push $output/$targetFolder-macos.zip $butlerProject:macos --userversion $gameVersion
		./$butler push $output/$targetFolder-linux.zip $butlerProject:linux --userversion $gameVersion
		./$butler push $output/$targetFolder.apk $butlerProject:android --userversion $gameVersion
	fi
	
	echo "Finished deployment to itch.io!"
}

# Process all command line arguments
while [ "$1" != "" ]; do
    case $1 in
        -m | --machine )        shift
                                machine=$1
                                ;;
        -b | --build )          shift
                                build=$1
                                ;;
        -d | --deploy )         shift
                                deploy=$1
                                ;;
        --demo )        	    demo=true
                                ;;
        * )                     echo "Unknown Command Line Parameter"
                                exit 1
    esac
    shift
done

# Configure folder for tools
tools="./tools"
game="AuraMZ_Template_Game"
encryptionKey="auramz"
targetFolder="auramz-template-game"
itchBaseProject="auramz"
input="./$game"

# Overwrite package.json
cp releng/package.json $input/package.json

# Configure Game
gameVersion=$(cat $input/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

output="./build"

# Output configuration data
echo "Build: $build"
echo "Game Version: $gameVersion"

# Minify json
mkdir -p ./tmp/$input/data
for jsonFile in $input/data/*.json
do
  json-minify "$jsonFile" > "tmp/$jsonFile"
  cp "./tmp/$jsonFile" "$jsonFile" 
done
rm -rf ./tmp

# Configurs NWJS
nwjsVersion="v0.48.4"
nwjs=$tools/nwjs/$nwjsVersion

# Download and setup butler
mkdir $tools/downloads -p

# Download NWJS
if [ ! -d "$nwjs" ]; then
    curl -L -o $tools/downloads/nwjs-linux-x64.tar.gz https://dl.nwjs.io/$nwjsVersion/nwjs-$nwjsVersion-linux-x64.tar.gz
    curl -L -o $tools/downloads/nwjs-win-x64.zip https://dl.nwjs.io/$nwjsVersion/nwjs-$nwjsVersion-win-x64.zip
    curl -L -o $tools/downloads/nwjs-osx-x64.zip https://dl.nwjs.io/$nwjsVersion/nwjs-$nwjsVersion-osx-x64.zip
    mkdir $nwjs -p
    tar -xzf $tools/downloads/nwjs-linux-x64.tar.gz -C $nwjs
    unzip -o $tools/downloads/nwjs-osx-x64.zip -d $nwjs
    unzip -o $tools/downloads/nwjs-win-x64.zip -d $nwjs
    mv $nwjs/nwjs-$nwjsVersion-linux-x64 $nwjs/nwjs-linux
    mv $nwjs/nwjs-$nwjsVersion-win-x64 $nwjs/nwjs-win
    mv $nwjs/nwjs-$nwjsVersion-osx-x64 $nwjs/nwjs-mac
    # Eliminating symlinks with regular text files
    find $nwjs/nwjs-mac -type l -exec bash -c 'link=$(readlink "{}"); echo "Replacing Symlink {} -> $link"; rm "{}"; echo "$link" > "{}"'  \;
	cp releng/v8_context_snapshot.x86_64.bin $nwjs/nwjs-mac/v8_context_snapshot.x86_64.bin
else
    echo "Butler version $butlerVersion ($butlerChannel) already downloaded"
fi

# Download and setup RPGMPacker
npx rpgmpacker@latest

# Create a clean output folder
mkdir $output -p

# Run RPGMPacker
npx rpgmpacker --input $input --output $output --rpgmaker "$nwjs" --hardlinks --exclude --encryptionKey "$encryptionKey" --encryptAudio true --encryptImages true --noempty --platforms "Windows" "OSX" "Linux" "Browser"

# Change generic folder names
mv $output/Windows $output/$targetFolder-windows
mv $output/OSX $output/$targetFolder-macos
mv $output/Linux $output/$targetFolder-linux
mv $output/Browser $output/$targetFolder-browser

# For MacOS adjust the external save directory to a mac os conform path
sed -i 's/"externalSaveDirectory":"AppData\/Local\/AuraGamedev\/AuraMZ_Template_Game\/"/"externalSaveDirectory":"Library\/Application Support\/AuraGamedev\/AuraMZ_Template_Game\/"/' $output/$targetFolder-macos/Game.app/Contents/Resources/app.nw/js/plugins.js

# ZIP deployed products
7z a -tzip -o$output $output/$targetFolder-windows.zip $output/$targetFolder-windows/
7z a -tzip -o$output $output/$targetFolder-macos.zip $output/$targetFolder-macos/
7z a -tzip -o$output $output/$targetFolder-linux.zip $output/$targetFolder-linux/

# Install android build tools
SDK_MANAGER=$ANDROID_SDK_ROOT/cmdline-tools/latest/bin/sdkmanager
yes | $SDK_MANAGER --install "build-tools;30.0.3"
ls $ANDROID_SDK_ROOT/build-tools

# Build android apk
echo "Building android apk"
javaVersion=$(java -version)
echo "Java Version: $javaVersion"
cd android-app
cp -a ../$output/$targetFolder-browser/ app/src/main/assets/www/
echo -n ${ANDROID_KEYSTORE} | base64 -d > app/$targetFolder.keystore
VERSION_CODE=$(date '+%s')
./gradlew --version
./gradlew build -PversionCode=$VERSION_CODE -PversionName="$gameVersion" --warning-mode all
ls app/build/outputs/apk/release/
mv app/build/outputs/apk/release/app-release.apk ../$output/$targetFolder.apk
cd ../
echo "Finished build!"

for host in $deploy
do
	case $host in
	    itch )				deployItch;;
	esac
done