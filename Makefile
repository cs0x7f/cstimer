src = src
ifndef dest
	dest = dist
endif
ifndef destnpm
	destnpm = npm_export
endif
closure = lib/compiler.jar
compile = java -jar $(closure) --use_types_for_optimization --language_out STABLE --charset UTF-8 --strict_mode_input
isolation = --isolation_mode IIFE
advanced = -O ADVANCED
debugoff = --define='DEBUGM=false' --define='DEBUGWK=false'
timerSrc = $(addprefix $(src)/js/, \
lib/utillib.js \
lib/sha256.js \
lib/isaac.js \
lib/mathlib.js \
lib/grouplib.js \
lib/poly3dlib.js \
lib/pat3x3.js \
lib/sbtree.js \
lib/sqlfile.js \
lib/tdconverter.js \
lib/lzstring.js \
lib/min2phase.js \
lib/cubeutil.js \
lib/puzzlefactory.js \
kernel.js \
export.js \
logohint.js \
timer.js \
timer/input.js \
timer/stackmat.js \
timer/bttimer.js \
timer/virtual.js \
timer/giiker.js \
solver/ftocta.js \
solver/kilominx.js \
scramble/scramble.js \
scramble/megascramble.js \
scramble/scramble_333_edit.js \
scramble/scramble_444.js \
scramble/scramble_sq1_new.js \
scramble/pyraminx.js \
scramble/skewb.js \
scramble/2x2x2.js \
scramble/gearcube.js \
scramble/1x3x3.js \
scramble/2x2x3.js \
scramble/clock.js \
scramble/333lse.js \
scramble/mgmlsll.js \
scramble/kilominx.js \
scramble/scramble_fto.js \
scramble/redi.js \
scramble/slide.js \
scramble/utilscramble.js \
lib/storage.js \
stats/timestat.js \
stats/stats.js \
stats/stattool.js \
stats/trend.js \
stats/distribution.js \
stats/hugestat.js \
stats/dlystat.js \
stats/recons.js \
stats/trainstat.js \
tools/tools.js \
tools/image.js \
tools/cross.js \
tools/eoline.js \
tools/roux1.js \
tools/gsolver.js \
tools/thistlethwaite.js \
tools/pat3x3gen.js \
tools/bluetoothutil.js \
tools/metronome.js \
tools/onlinecomp.js \
tools/battle.js \
tools/syncseed.js \
tools/bldhelper.js \
twisty/twistyreplay.js \
shortcut.js \
help.js \
hardware/stackmat.js \
tools/stackmatutil.js \
hardware/bluetooth.js \
hardware/giikercube.js \
hardware/gocube.js \
hardware/gancube.js \
hardware/moyucube.js \
hardware/moyu32cube.js \
hardware/qiyicube.js \
hardware/gantimer.js \
hardware/qiyitimer.js \
worker.js)

cache = $(addprefix $(dest)/, \
timer.php \
js/cstimer.js \
js/twisty.js \
css/style.css) $(langJS) $(langPHP)

twistySrc = $(addprefix $(src)/js/, \
lib/threemin.js \
lib/pnltri.js \
twisty/twisty.js \
twisty/twistynnn.js \
twisty/twistysq1.js \
twisty/twistyskb.js \
twisty/twistyclk.js \
twisty/twistypoly.js \
twisty/qcube.js \
twisty/qcubennn.js \
twisty/qcubeminx.js \
twisty/qcubeclk.js)

moduleSrc = $(addprefix $(src)/js/, \
lib/utillib.js \
lib/isaac.js \
lib/mathlib.js \
lib/grouplib.js \
lib/poly3dlib.js \
lib/pat3x3.js \
lib/min2phase.js \
lib/cubeutil.js \
solver/ftocta.js \
solver/kilominx.js \
scramble/scramble.js \
scramble/megascramble.js \
scramble/scramble_333_edit.js \
scramble/scramble_444.js \
scramble/scramble_sq1_new.js \
scramble/pyraminx.js \
scramble/skewb.js \
scramble/2x2x2.js \
scramble/gearcube.js \
scramble/1x3x3.js \
scramble/2x2x3.js \
scramble/clock.js \
scramble/333lse.js \
scramble/mgmlsll.js \
scramble/kilominx.js \
scramble/scramble_fto.js \
scramble/redi.js \
scramble/slide.js \
scramble/utilscramble.js \
tools/tools.js \
tools/image.js \
tools/cross.js \
worker.js)

cstimer = $(dest)/js/cstimer.js
twisty = $(dest)/js/twisty.js
cstimer_module = $(destnpm)/cstimer_module.js
css = $(addprefix $(dest)/css/, $(shell ls $(src)/css))
langJS = $(addprefix $(dest)/lang/, $(shell ls $(src)/lang/ | grep .*\.js))
langPHP = $(addprefix $(dest)/lang/, $(shell ls $(src)/lang/ | grep .*\.php))

version := $(shell git describe --tags --always 2>/dev/null || echo Unspecified)

all: $(cstimer) $(twisty) $(css) $(langJS) $(langPHP) version $(dest)/cache.manifest $(dest)/sw.js

module: $(cstimer_module)

version: $(langPHP)
	@echo "Build Version: $(version)"
	@sed -i 's/\$$version = "[^"]*"/\$$version = "$(version)"/g' $(dest)/lang/langDet.php

clean:
	rm -f $(cstimer) $(twisty) $(css) $(langJS) $(langPHP)

local: all
	mkdir -p $(dest)/local/js $(dest)/local/css
	php -d include_path=$(dest) $(dest)/timer.php | sed "s/.*manifest.*//g" > $(dest)/local/index.html
	cp $(dest)/js/jquery.min.js $(dest)/local/js/jquery.min.js
	cp $(dest)/js/cstimer.js $(dest)/local/js/cstimer.js
	cp $(dest)/js/twisty.js $(dest)/local/js/twisty.js
	cp $(dest)/css/style.css $(dest)/local/css/style.css

check: $(twistySrc) $(timerSrc)
	@$(compile) --externs experiment/checkwrap.js $(src)/lang/en-us.js $(timerSrc) $(twistySrc) -O ADVANCED --checks-only --jscomp_off checkTypes

$(cstimer): $(twisty) $(timerSrc)
	@echo $@
	@$(compile) $(debugoff) $(timerSrc) --js_output_file $(cstimer)

$(twisty): $(twistySrc)
	@echo $@
	@$(compile) $(twistySrc) --js_output_file $(twisty)

$(cstimer_module): $(moduleSrc)
	@echo $@
	@$(compile) $(debugoff) $(moduleSrc) $(isolation) --define='ISCSTIMER=false' --js_output_file $(cstimer_module)

$(css): $(dest)/css/%.css: $(src)/css/%.css
	@echo $@
	@cp $< $@

$(langPHP): $(dest)/lang/%: $(src)/lang/%
	@echo $@
	@cp $< $@

$(langJS): $(dest)/lang/%: $(src)/lang/%
	@echo $@
	@$(compile) $< --js_output_file $@

$(dest)/cache.manifest: $(cache) version
	@echo $@
	@sed -i '$$d' $@
	@echo -n \# MD5= >> $@
	@cat $(cache) | md5sum | awk '{print $$1}' >> $@

$(dest)/sw.js: $(cache) version
	@echo $@
	@sed -i '$$d' $@
	@echo 'var CACHE_NAME = "cstimer_cache_'`cat $(cache) | md5sum | awk '{print $$1}'`'";' >> $@

.PHONY: all clean version check
