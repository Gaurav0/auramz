First of all, thank you for being interested to contributing!

# Helping Others

If you find somebody in need of help, do feel free to help!

# Reporting Issues

If you encounter a bug, spelling mistake, or find a major user inconvenience, please do feel free to use the issue tracker on GITGUD to report your findings.
Please be descriptive and provide as much material for reproduction as you can.
For example a save file + steps for reproduction + observed bug are helpful.

# Analyzing Issues

If there are bug reports with lack of information you can contribute by trying to reproduce the bug yourself and adding the
missing information to the issue.

# Submitting Changes

The following contains a step by step guide to the workflow for submitting changes.

1. Install [git](https://git-scm.com/), [git lfs](https://git-lfs.github.com/), [python](https://www.python.org/downloads/) and [pre-commit](https://pre-commit.com/). Checkout the project using git if you have Developer rights on this project. Otherwise, first create a Fork and then check out the Fork.
2. Check if there already exists an issue for the contribution you want to tackle.
If not, create a new issue.
3. Create a merge request from the issue.
    * If you are making a new feature, new content, or otherwise experimental change, please branch from `develop`.
    * If you want to contribute a fix for the next public release, please branch from `staging.
    * Make sure the string `Closes #issueNumber` is in the merge request for automatic issue closing.
4. Perform your changes.
    * Commit & Push regularly. 
    * Ideally, include a 1 sentence header description and the expression #issueNumber in the commit message.
5. Your request will be reviewed and there may be comments to improve your contribution.
Please apply the requested changes by the reviewer.
Once the reviewer approved of changes, the merge request will be approved and your changes merged branch.

Congrats! Your changes just helped improve Star Knightess Aura!

# Best Practices

* Regarding `package.js`, `MapInfos.json`, `System.json`. 
Whenever you save in RPG Maker these files will show changes. 
Be sure to only commit them when you have actually performed change on them.
    * `package.js` contains meta info about the node.js project.
    Usually only needs to be committed when updating version numbers.
    * `MapInfos.json` contains meta info about the maps.
    Only commit when adding or removing a map.
    * `System.json` contains the variables and switches, so if you introduce a new variable or switch, it should be commited.
* Mark your merge request as a draft when you are still developing, mark it as ready when it's ready for review.
* If you integrate a new plugin, update `CREDITS` file and supply author of the plugin and a link to it.
* When overwriting methods I recommend using the below pattern to ensure that you don't break compatibility with other plugins.

		const _class_method_name = class.prototype.method_name;
		class.prototype.method_name = (params) {
			_class_method_name.call(this, params);
			// Custom code here
		}
		
* Run `pre-commit run -a` to prettify JSON.

# Plugin Structure

* **[plugins/auramz/]** Reusable non-ui focused plugins that serve to make aura-like games but do not depend on the current game. Hard-codings
of game specific references should be moved to plugin params.
* **[plugins/auramzui/]** Reusable ui focused plugins that serve to make aura-like games. Otherwise same as above.
* **[plugins/thirdparty/]** Plugins from third parties. Must all be properly attributed in the CREDITS file including their source of origin.

# Git Tips

## Synchronizing Your Fork With Develop

If you merge with the `develop` branch from your local fork you will not have the latest commits from the main project!
In order to get these commits into the `develop` branch of your fork, execute the following git commands.

```sh
git remote add upstream https://gitgud.io/aura-dev/auramz.git
git fetch upstream
git checkout develop
git pull upstream develop
git push origin develop
```

If you have problems getting the newest image resources via git lfs, try

```sh
git lfs install --skip-smudge
```

# About Labels

If you create an issue, it is recommended to add an appropriate label to it.
An issue should ideally only have one label (the most appropriate one), but may have multiples if necessary.

- ~Balancing Changes some gameplay related value or configuration, without introducing a new feature.
Examples: Changing the ATK of an enemy, changing the price of an item, adding a status effect to a skill, changing the duration of a state.
- ~Bug Something is not working as intended. Includes typos.
Examples: The game crashes, a modifier is not being applied correctly, incorrect amount of gold is gained from a quest, a word has a typo.
- ~Build Changes the build process. Should ideally only affect files in `releng/`.
Examples: Fixing a bug in the automated build, adding an additional deployment target.
- ~Concept A non-functional change that documents future content. Ideally should only affect files in `Concept/`.
Examples: A quest draft, a draft for a lewd scene, a draft for a real world scene, a concept sketch for a map.
- ~Feature A functional or content addition. **This is the goto label for any contribution that adds something!**
Examples: A new map, a new mechanic, a new real world event, a new enemy, a new item.
- ~Improvement A change that has little functional impact to the existing content.
Examples: Improving the description of a skill, replacing artwork, an editorial improvement to a text box.
- ~Meta A change to the development environment.
Examples: Improving the contribution guide, adding utility scripts in `util/`, archiving official screenshots, maintenance to the git repository.
- ~Quality A change that improves the quality of the code without changing its functionality.
Examples: Extracting repeated scripts into a common event, refactoring a common event to a plugin, improving the code quality of a plugin, making a plugin reusable in other projects.
- ~Release Contains all work that needs to be done to perform a release.
Examples: Updating the changelog, updating the version number.
- ~WontFix Mark something as to not be implemnted so when you browse the closed issues, it is clear that this item was not solved.
Examples: A bug for which it turns out that it would resolve itself after implementing a major planned feature in the future.

# Release Process

1. Create a milestone "x.y.z" with x.y.z being the release version, that holds all the tickets that should go into the release.
2. Perform the work and finish all tickets on the milestone.
3. Create a release ticket called "Release x.y.z".
4. Create a merge request for the release ticket branching off `develop`. 
5. Update the version number in `plugin.js` and `releng/package.json/`.
6. Merge the changes into `develop`.
7. Create a merge request from `develop` to `master` called `Release x.y.z`.
9. Create a new Release in gitlab. For the tag, use `master` as the source. Set the tag name and the release name to`Release_x.y.z`. Do not add a message to the tag. Assign the release milestone in milestones and copy&paste the changelog update into Release notes field.
10. Press "Create release". A release job should now trigger. If it finishes building successfully,
you have built a release!

