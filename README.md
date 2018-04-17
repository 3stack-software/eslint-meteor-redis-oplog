# eslint-plugin-meteor-redis-oplog-namespaces

Ensures MongoDB queries are namespaced when using meteor/cultofcoders:redis-oplog

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-meteor-redis-oplog-namespaces`:

```
$ npm install eslint-plugin-meteor-redis-oplog-namespaces --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-meteor-redis-oplog-namespaces` globally.

## Usage

Add `meteor-redis-oplog-namespaces` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "meteor-redis-oplog-namespaces"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "meteor-redis-oplog-namespaces/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





