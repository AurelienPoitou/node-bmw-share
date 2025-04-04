// ASCII to hex for IKE/MID message
function a2h(data) {
	const array = [];

	for (let n = 0, l = data.length; n < l; n++) {
		array.push(data.charCodeAt(n));
	}

	return array;
}

// Convert hex to ASCII
function h2a(data) {
	data    = data.toString();
	let str = '';

	for (let i = 0; i < data.length; i += 2) { str += String.fromCharCode(parseInt(data.substr(i, 2), 16)); }

	return str;
}

// Convert hex to string
function h2s(data) {
	data = Buffer.from(data);

	if (data[0] === 0x1A) data = data.slice(3); // Check control message
	if (data[0] === 0x21) data = data.slice(4); // MID menu text
	if (data[0] === 0x23) data = data.slice(4); // IKE text
	if (data[0] === 0x24) data = data.slice(3); // OBC text

	// IKE text suffix
	if (data[data.length - 1] === 0x04) data = data.slice(0, -1);

	// Format
	data = data.toString();
	data = data.replace(/�/g, '°');
	data = data.replace(/ {2}/g, ' ');

	data = data.trim();
	return data;
}

// Convert integer or array of integers to hex string
// Useful for CANBUS ARBIDs, etc
//
// hex.i2s(191) => '0xBF'
// hex.i2s([191, 255]) => ['0xBF', '0xFF']
function i2s(data, prefix = true, length = 2) {
    if (data === undefined || data === null || data === '') return false;

    const toHex = (num) => {
        let hexstr = num.toString(16).toUpperCase().padStart(length, '0');
        return prefix ? '0x' + hexstr : hexstr;
    };

    return Array.isArray(data) ? data.map(toHex) : toHex(data);
}


module.exports = {
	// Functions
	a2h : (data) => a2h(data),
	h2a : (data) => h2a(data),
	h2s : (data) => h2s(data),

	i2s : (data, prefix, length) => i2s(data, prefix, length),
};
