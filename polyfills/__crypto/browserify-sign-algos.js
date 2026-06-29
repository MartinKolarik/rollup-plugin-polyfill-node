function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var sha224WithRSAEncryption = {
	sign: "rsa",
	hash: "sha224",
	id: "302d300d06096086480165030402040500041c"
};
var sha256WithRSAEncryption = {
	sign: "rsa",
	hash: "sha256",
	id: "3031300d060960864801650304020105000420"
};
var sha384WithRSAEncryption = {
	sign: "rsa",
	hash: "sha384",
	id: "3041300d060960864801650304020205000430"
};
var sha512WithRSAEncryption = {
	sign: "rsa",
	hash: "sha512",
	id: "3051300d060960864801650304020305000440"
};
var sha256 = {
	sign: "ecdsa/rsa",
	hash: "sha256",
	id: "3031300d060960864801650304020105000420"
};
var sha224 = {
	sign: "ecdsa/rsa",
	hash: "sha224",
	id: "302d300d06096086480165030402040500041c"
};
var sha384 = {
	sign: "ecdsa/rsa",
	hash: "sha384",
	id: "3041300d060960864801650304020205000430"
};
var sha512 = {
	sign: "ecdsa/rsa",
	hash: "sha512",
	id: "3051300d060960864801650304020305000440"
};
var DSA = {
	sign: "dsa",
	hash: "sha1",
	id: ""
};
var ripemd160WithRSA = {
	sign: "rsa",
	hash: "rmd160",
	id: "3021300906052b2403020105000414"
};
var md5WithRSAEncryption = {
	sign: "rsa",
	hash: "md5",
	id: "3020300c06082a864886f70d020505000410"
};
var require$$0 = {
	sha224WithRSAEncryption: sha224WithRSAEncryption,
	"RSA-SHA224": {
	sign: "ecdsa/rsa",
	hash: "sha224",
	id: "302d300d06096086480165030402040500041c"
},
	sha256WithRSAEncryption: sha256WithRSAEncryption,
	"RSA-SHA256": {
	sign: "ecdsa/rsa",
	hash: "sha256",
	id: "3031300d060960864801650304020105000420"
},
	sha384WithRSAEncryption: sha384WithRSAEncryption,
	"RSA-SHA384": {
	sign: "ecdsa/rsa",
	hash: "sha384",
	id: "3041300d060960864801650304020205000430"
},
	sha512WithRSAEncryption: sha512WithRSAEncryption,
	"RSA-SHA512": {
	sign: "ecdsa/rsa",
	hash: "sha512",
	id: "3051300d060960864801650304020305000440"
},
	"RSA-SHA1": {
	sign: "rsa",
	hash: "sha1",
	id: "3021300906052b0e03021a05000414"
},
	"ecdsa-with-SHA1": {
	sign: "ecdsa",
	hash: "sha1",
	id: ""
},
	sha256: sha256,
	sha224: sha224,
	sha384: sha384,
	sha512: sha512,
	"DSA-SHA": {
	sign: "dsa",
	hash: "sha1",
	id: ""
},
	"DSA-SHA1": {
	sign: "dsa",
	hash: "sha1",
	id: ""
},
	DSA: DSA,
	"DSA-WITH-SHA224": {
	sign: "dsa",
	hash: "sha224",
	id: ""
},
	"DSA-SHA224": {
	sign: "dsa",
	hash: "sha224",
	id: ""
},
	"DSA-WITH-SHA256": {
	sign: "dsa",
	hash: "sha256",
	id: ""
},
	"DSA-SHA256": {
	sign: "dsa",
	hash: "sha256",
	id: ""
},
	"DSA-WITH-SHA384": {
	sign: "dsa",
	hash: "sha384",
	id: ""
},
	"DSA-SHA384": {
	sign: "dsa",
	hash: "sha384",
	id: ""
},
	"DSA-WITH-SHA512": {
	sign: "dsa",
	hash: "sha512",
	id: ""
},
	"DSA-SHA512": {
	sign: "dsa",
	hash: "sha512",
	id: ""
},
	"DSA-RIPEMD160": {
	sign: "dsa",
	hash: "rmd160",
	id: ""
},
	ripemd160WithRSA: ripemd160WithRSA,
	"RSA-RIPEMD160": {
	sign: "rsa",
	hash: "rmd160",
	id: "3021300906052b2403020105000414"
},
	md5WithRSAEncryption: md5WithRSAEncryption,
	"RSA-MD5": {
	sign: "rsa",
	hash: "md5",
	id: "3020300c06082a864886f70d020505000410"
}
};

var algos = require$$0;

var algos_default = /*@__PURE__*/getDefaultExportFromCjs(algos);

export { algos_default as default };
