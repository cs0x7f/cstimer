src = src
ifndef dest
	dest = dist
endif
closure = lib/compiler.jar
yui = lib/yuicompressor.jar
externJQ = --externs lib/jquery-1.7.js
externTwisty = --externs $(src)/js/threemin.js --externs $(src)/js/twisty.js --externs $(dest)/js/twisty.js
externLang = --externs $(src)/lang/cn.js
compile = java -jar $(closure) --jscomp_off externsValidation --use_types_for_optimization
advanced = -O ADVANCED

timerSrc = $(addprefix $(src)/js/, \
mathlib.js \
mersennetwister.js \
json.min.js \
kernel.js \
timer.js \
scramble.js \
scramblers/megascramble.js \
scramblers/scramble_333_edit.js \
scramblers/scramble_444.js \
scramblers/scramble_sq1_new.js \
scramblers/pyraminx.js \
scramblers/skewb.js \
scramblers/2x2x2.js \
scramblers/gearcube.js \
scramblers/1x3x3.js \
scramblers/2x2x3.js \
scramblers/clock.js \
scramblers/333lse.js \
scramblers/utilscramble.js \
stats.js \
tools.js \
tools/image.js \
tools/cross.js \
tools/eoline.js \
tools/insertionfinder.js \
shortcut.js \
help.js \
stackmat.js)

cache = $(addprefix $(dest)/, \
timer.php \
js/cstimer.js \
js/twisty.js \
css/style.css) $(langJS) $(langPHP)


twistySrc = \
$(src)/js/threemin.js \
$(src)/js/twisty.js \
$(src)/js/twisty/twistynnn.js \
$(src)/js/twisty/twistysq1.js \
$(src)/js/twisty/twistyskb.js

cstimer = $(dest)/js/cstimer.js
twisty = $(dest)/js/twisty.js
css = $(addprefix $(dest)/css/, $(shell ls $(src)/css))
langJS = $(addprefix $(dest)/lang/, $(shell ls $(src)/lang/ | grep .*\.js))
langPHP = $(addprefix $(dest)/lang/, $(shell ls $(src)/lang/ | grep .*\.php))

all: $(cstimer) $(twisty) $(css) $(langJS) $(langPHP) $(dest)/cache.manifest

clean:
	rm -f $(cstimer) $(twisty) $(css) $(langJS) $(langPHP)

local: all
	php $(dest)/timer.php | sed "s/http:\/\/lib\.sinaapp\.com\/js\/jquery\/1\.8\//js\//g" | sed "s/ manifest=\"cache\.manifest\"//g" > $(dest)/local/timer.html
	cp $(dest)/js/cstimer.js $(dest)/local/js/cstimer.js
	cp $(dest)/js/twisty.js $(dest)/local/js/twisty.js
	cp $(dest)/css/style.css $(dest)/local/css/style.css

$(cstimer): $(twisty) $(timerSrc)
	@echo $@
	@$(compile) $(advanced) $(externJQ) $(externTwisty) $(externLang) $(timerSrc) --js_output_file $(cstimer)

$(twisty): $(twistySrc)
	@echo $@
	@$(compile) $(twistySrc) --js_output_file $(twisty)

$(css): $(dest)/css/%.css: $(src)/css/%.css
	@echo $@
	@java -jar $(yui) --type css $< -o $@

$(langPHP): $(dest)/lang/%: $(src)/lang/%
	@echo $@
	@cp $< $@

$(langJS): $(dest)/lang/%: $(src)/lang/%
	@echo $@
	@$(compile) $< --js_output_file $@

$(dest)/cache.manifest: $(cache)
	@echo $@
	@sed -i '$$d' $@
	@echo -n \# MD5= >> $@
	@cat $(cache) | md5sum >> $@

.PHONY: all