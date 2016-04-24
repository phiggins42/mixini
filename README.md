# mixini

A quick thing to save a few lines of code when working with `ini` files in nodejs. really just a simple combination of `ini` and `lodash.merge`

## why

Because I needed it, and used the pattern more than twice. Now I can just add it as a package dep instead of copying the code around. You can too, if you find this pattern useful.

The `ini` format is fairly common. I find it much easier to write and maintain configuration type files in this over JSON syntax. Nicer diffs on config changes, less boilerplate (who hand-writes JSON anyway, right?) and so on.

Mixing `ini` files means just that. Blend two or more ini-syntax files into one resulting object definition. Why bother mixing you might ask? Because enviroments.

In production my database is not `localhost`, in dev it probably is. How do I switch between the two seamlessly and effortlessly? Two config files.

```
; prod.ini
[database]
host = 10.11.12.13
name = mixini
````

and

```
; dev.ini
[database]
host = localhost

```

mixing the two objects yields:

```
{
	"database":{
		"host":"localhost",
		"name":"mixini"
	}
}
```

merging them from prod <- dev allows me to setup a dev enviroment where the application looks to localhost for the connection, or some IP otherwise. If the enviroment is production, the config is already there.

Another case would be hard-coding working API keys / secrets into your configuration files, while not wanting to expose them in any way. With a `.gitignore` you can omit your "real" API keys from git, while releasing a version with placeholder text:

```
; default.config.ini
[aws]
secrect_key = ENTER_YOUR_SECRECT_KEY
```

and your own (ignored) local override:

```
; phiggins.config.ini
[aws]
secrect_key = T0T4LLYN0TR34LLYMYK3Y
```

## install

Just `npm` it in:

```
npm install mixini --save
```

## usage

load the module, pass the result a series of ini file results.

```
var mixini = require("mixini"),
	fs = require("fs"),
	base = fs.readFileSync("./base.ini", "utf8"),
	env = fs.readFileSync("./override.ini", "utf8")
;

// my config is:
var config = mixini(base, env);
```

there are 11ty ways you can design to determine how and when to mix in additional overrides. that is an exercise left to the reader.

## todo

* tests
* syntatic sugar over forcing `fs` usage? file paths, streams, etc?
* make async-able


