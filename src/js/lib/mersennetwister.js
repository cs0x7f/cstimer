"use strict";

//
//  Version     File name           Description
//  -------     ---------           -----------
//  2004-12-03  hr$mersennetwister.js       original version will stay available,
//                          but is no longer maintained by Henk Reints
//
//  2005-11-02  hr$mersennetwister2.js      o  renamed constructor from "MersenneTwister"
//                             to "MersenneTwisterObject"
//                          o  exposure of methods now in separate section near the end
//                          o  removed "this." from internal references
//
// ====================================================================================================================
// Mersenne Twister mt19937ar, a pseudorandom generator by Takuji Nishimura and Makoto Matsumoto.
// Object Oriented JavaScript version by Henk Reints (http://henk-reints.nl)
// ====================================================================================================================
// Original header text from the authors (reformatted a little bit by HR):
// -----------------------------------------------------------------------
//
//  A C-program for MT19937, with initialization improved 2002/1/26.
//  Coded by Takuji Nishimura and Makoto Matsumoto.
//
//  Before using, initialize the state by using init_genrand(seed) or init_by_array(init_key, key_length).
//
//  Copyright (C) 1997 - 2002, Makoto Matsumoto and Takuji Nishimura, All rights reserved.
//
//  Redistribution and use in source and binary forms, with or without modification,
//  are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation and/or
//     other materials provided with the distribution.
//
//  3. The names of its contributors may not be used to endorse or promote products derived from this software
//     without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
//  WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
//  PARTICULAR PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
//  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
//  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
//  HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
//  POSSIBILITY OF SUCH DAMAGE.
//
//  Any feedback is very welcome.
//  http://www.math.sci.hiroshima-u.ac.jp/~m-mat/MT/emt.html
//  email: m-mat @ math.sci.hiroshima-u.ac.jp (remove space)
//
// ====================================================================================================================
// Remarks by Henk Reints about this JS version:
//
// Legal stuff:
//  THE ABOVE LEGAL NOTICES AND DISCLAIMER BY THE ORIGINAL AUTHORS
//  ALSO APPLY TO THIS JAVASCRIPT TRANSLATION BY HENK REINTS.
//
// Contact:
//  For feedback or questions you can find me on the internet: http://henk-reints.nl
//
// Description:
//  This is an Object Oriented JavaScript version of the Mersenne Twister.
//
// Constructor:
//  MersenneTwisterObject([seed[,seedArray]])
//      if called with 0 args then a default seed   is used for initialisation by the 'init' method;
//      if called with 1 arg  then 'seed'           is used for initialisation by the 'init' method;
//      if called with 2 args then 'seedArray,seed' is used for initialisation by the 'initByArray' method;
//      if a supplied seed is NaN or not given then a default is used.
//
// Properties:
//  none exposed
//
// Methods:
//  init0(seed)     initialises the state array using the original algorithm
//                if seed is NaN or not given then a default is used
//  init(seed)      initialises the state array using the improved algorithm
//                if seed is NaN or not given then a default is used
//  initByArray(seedArray[,seed])
//              initialises the state array based on an array of seeds,
//                the 2nd argument is optional, if given and not NaN then it overrides
//                the default seed which is used for the very first initialisation
//  skip(n)         lets the random number generator skip a given count of randoms
//                if n <= 0 then it advances to the next scrambling round
//                in order to produce an unpredictable well-distributed sequence, you could let n be
//                generated by some other random generator which preferrably uses external events to
//                create an entropy pool from which to take the numbers.
//                this method has been added by Henk Reints, 2004-11-16.
//  randomInt32()       returns a random 32-bit integer
//  randomInt53()       returns a random 53-bit integer
//                this is done in the same way as was introduced 2002/01/09 by Isaku Wada
//                in his genrand_res53() function
//  randomReal32()      returns a random floating point number in [0,1) with 32-bit precision
//                please note that - at least on Microsoft Platforms - JavaScript ALWAYS stores
//                Numbers with a 53 bit mantissa, so randomReal32() is not the best choice in JS.
//                it is provided to be able to produce output that can be compared to the demo
//                output given by the original authors. For JavaScript implementations I suggest
//                you always use the randomReal53 method.
//  randomReal53()      returns a random floating point number in [0,1) with 53-bit precision
//                this is done in the same way as was introduced 2002/01/09 by Isaku Wada
//                in the genrand_res53() function
//  randomString(len)   returns a random string of given length, existing of chars from the charset:
//                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", which is identical
//                to the character set used for base64 encoding, so effectively it generates a random
//                base64-encoded number of arbitrary precision.
//                If you intend to use a random string in a URL string, then the "+" and "/" should
//                be converted to URL syntax using the JavaScript built-in 'escape' method.
//                this method has been added by Henk Reints, 2004-11-16.
//  random()        a synonym for randomReal53  [HR/2004-12-03]
//  randomInt()     a synonym for randomInt32   [HR/2004-12-03]
//                these two synonyms are intended to be generic names for normal use.
//
// Examples of object creation:
//  mt = new MersenneTwisterObject()            // create object with default initialisation
//  mt = new MersenneTwisterObject(19571118)        // create object using a specific seed
//  mt = new MersenneTwisterObject(Nan,[1957,11,18,03,06])  // create object using a seed array only
//  mt = new MersenneTwisterObject(1957,[11,18,03,06])  // create object using a seed array AND a specific seed
//
// Examples of (re)initialisation (to be done after the object has been created):
//  mt.init0()              // re-init using the old-style algorithm with its default seed
//  mt.init0(181157)            // re-init using the old-style algorithm with a given seed
//  mt.init()               // re-init using the new-style algorithm with its default seed
//  mt.init(181157)             // re-init using the new-style algorithm with a given seed
//  mt.initByArray([18,11,57])      // re-init using a seed array
//  mt.initByArray([18,11,57],0306)     // re-init using a seed array AND a specific seed
//
// Example of generating random numbers (after creation of the object and optional re-initialisation of its state):
//  while (condition)
//  {   i = mt.randomInt32()            // get a random 32 bit integer
//      a = mt.randomReal53()           // and a random floating point number of maximum precision
//      x = myVerySophisticatedAlgorithm(i,a)   // do something with it
//  }
//
// Functions for internal use only:
//  dmul0(m,n)  performs double precision multiplication of two 32-bit integers and returns only the low order
//          32 bits of the product; this function is necessary because JS always stores Numbers with a
//          53-bit mantissa, leading to loss of 11 lowest order bits. In fact it is the pencil & paper
//          method for multiplying 2 numbers of 2 digits each, but it uses digits of 16-bits each. Since
//          only the low order result is needed, the steps that only affect the high order part of the
//          result are left out.
//
// Renamed original functions:          to:
//  init_genrand(s)             init(seed)
//  init_by_array(init_key,key_length)  initByArray(seedArray[,seed])
//  genrand_int32()             randomInt32()
//  genrand_real2()             randomReal32()
//  genrand_res53()             randomReal53()
//
// Other modifications w.r.t. the original:
//  - did not include the other variants returning real values - I think [0,1) is the only appropriate interval;
//  - included randomInt53() using the same method as was introduced 2002/01/09 by Isaku Wada in his genrand_res53;
//  - included randomString(len);
//  - included skip(n);
//  - in the randomInt32 method I have changed the check "if (mti >= N)" to a 'while' loop decrementing mti by N
//    in each iteration, which allows skipping a range of randoms by simply adding a value to the mti property.
//    By setting mti to a negative value you can force an advance to the next scrambling round.
//    Since in this library the uninitialised state is not marked by mti==N+1 that's is a safe algorithm.
//    When using the constructor, a default initialisation is always performed.
//
// Notes:
//  - Whenever I say 'random' in this file, I mean of course 'pseudorandom';
//  - I have tested this only with Windows Script Host V5.6 on 32-bit Microsoft Windows platforms.
//    If it does not produce correct results on other platforms, then please don't blame me!
//  - As mentioned by the authors and on many other internet sites,
//    the Mersenne Twister does _NOT_ produce secure sequences for cryptographic purposes!
//    It was primarily designed for producing good pseudorandom numbers to perform statistics.
// ====================================================================================================================

function MersenneTwisterObject(seed, seedArray) {
	var N = 624,
		mask = 0xffffffff,
		mt = [],
		mti = NaN,
		m01 = [0, 0x9908b0df]
	var M = 397,
		N1 = N - 1,
		NM = N - M,
		MN = M - N,
		U = 0x80000000,
		L = 0x7fffffff,
		R = 0x100000000

	function dmul0(m, n) {
		var H = 0xffff0000,
			L = 0x0000ffff,
			R = 0x100000000,
			m0 = m & L,
			m1 = (m & H) >>> 16,
			n0 = n & L,
			n1 = (n & H) >>> 16,
			p0, p1, x
		p0 = m0 * n0, p1 = p0 >>> 16, p0 &= L, p1 += m0 * n1, p1 &= L, p1 += m1 * n0, p1 &= L, x = (p1 << 16) | p0
		return (x < 0 ? x + R : x)
	}

	function init0(seed) {
		var x = (arguments.length > 0 && isFinite(seed) ? seed & mask : 4357),
			i
		for (mt = [x], mti = N, i = 1; i < N; mt[i++] = x = (69069 * x) & mask) {}
	}

	function init(seed) {
		var x = (arguments.length > 0 && isFinite(seed) ? seed & mask : 5489),
			i
		for (mt = [x], mti = N, i = 1; i < N; mt[i] = x = dmul0(x ^ (x >>> 30), 1812433253) + i++) {}
	}

	function initByArray(seedArray, seed) {
		var N1 = N - 1,
			L = seedArray.length,
			x, i, j, k
		init(arguments.length > 1 && isFinite(seed) ? seed : 19650218)
		x = mt[0], i = 1, j = 0, k = Math.max(N, L)
		for (; k; j %= L, k--) {
			mt[i] = x = ((mt[i++] ^ dmul0(x ^ (x >>> 30), 1664525)) + seedArray[j] + j++) & mask
			if (i > N1) {
				mt[0] = x = mt[N1];
				i = 1
			}
		}
		for (k = N - 1; k; k--) {
			mt[i] = x = ((mt[i] ^ dmul0(x ^ (x >>> 30), 1566083941)) - i++) & mask
			if (i > N1) {
				mt[0] = x = mt[N1];
				i = 1
			}
		}
		mt[0] = 0x80000000
	}

	function skip(n) {
		mti = (n <= 0 ? -1 : mti + n)
	}

	function randomInt32() {
		var y, k
		while (mti >= N || mti < 0) {
			mti = Math.max(0, mti - N)
			for (k = 0; k < NM; y = (mt[k] & U) | (mt[k + 1] & L), mt[k] = mt[k + M] ^ (y >>> 1) ^ m01[y & 1], k++) {}
			for (; k < N1; y = (mt[k] & U) | (mt[k + 1] & L), mt[k] = mt[k + MN] ^ (y >>> 1) ^ m01[y & 1], k++) {}
			y = (mt[N1] & U) | (mt[0] & L), mt[N1] = mt[M - 1] ^ (y >>> 1) ^ m01[y & 1]
		}
		y = mt[mti++], y ^= (y >>> 11), y ^= (y << 7) & 0x9d2c5680, y ^= (y << 15) & 0xefc60000, y ^= (y >>> 18)
		return (y < 0 ? y + R : y)
	}

	function randomInt53() {
		var two26 = 0x4000000
		return (randomInt32() >>> 5) * two26 + (randomInt32() >>> 6)
	}

	function randomReal32() {
		var two32 = 0x100000000
		return randomInt32() / two32
	}

	function randomReal53() {
		var two53 = 0x20000000000000
		return randomInt53() / two53
	}

	function randomString(len) {
		var i, r, x = "",
			C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
		for (i = 0; i < len; x += C.charAt((((i++) % 5) > 0 ? r : r = randomInt32()) & 63), r >>>= 6) {};
		return x
	}
	if (arguments.length > 1) initByArray(seedArray, seed)
	else if (arguments.length > 0) init(seed)
	else init()
	return randomReal53;
}
// ====================================================================================================================
// End of file hr$mersennetwister2.js - Copyright (c) 2004,2005 Henk Reints, http://henk-reints.nl

Math.random = new MersenneTwisterObject(new Date().getTime());
