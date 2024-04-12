const nbt = require('prismarine-nbt')
const parseNbt = require('util').promisify(nbt.parse)

const item_bytes =
	'H4sIAAAAAAAAAI2U3W7jRBTHJ+0udSKhgoQEXCANViWQtunaTuKP3GWTtHU3H23qZpsgVI3H02SSsR3Z41IH8Qg8ABJ3XOQSnoCLPMo+COI4XVYrxAV3c86c/+98aaaCUBmVeAUhVNpDezwo/VxCz9txFslSBe1LMttH5XMesFNBZilE/VVBletlJsTwh4glCtpzA3SkB9SgmmNWA2br1ZoeWFXb90m1fm/6ukY1atcZ6C6TeMUSyVlaRopkjzJLWLpLraDnYyIyhv5g+YU2vZ1rwe2FoLlrgu1da2LoLlaWG41zv+2abgj35y2zlzsfxDYkedMQk9rFfBpdZX441nq1kWDnI52GNw9Tb8QHnfFiEp7O+54Ip95gOVjMF8POjTExrtbDzpUxWbfWk8U4HHhiOfVmjxPvqt4/G4vJepn335zywdl03jcGy2Gnu+57lN/f6g5UX0EHAU9XguRl9KwXJ0wB55fo4+3GbsehTyS+ZBJcn2w31vWKsaCJtxvywtDQ5+BxI8mE4DMWUfZ0YRvoM7jokxmn+JRH7+ItQJS3G/McdsMSdAQhOzlNGElZivM4S3Ba8DGJgqcT+hRCKFlhP8cvAGIbJ0A5AMowZBH69olxlpBIpkUS3Tip4Z0zePvLb0XduJfRZSE6BNF1BvuLCOyNiH8K+C+x//bX3/GufqSAVfRQIL4qqmciwK5kYdFUo4DnuC3iB+jom3939CFoN4iC7ucFEwKJVTCfqmAjPpvLKhWcLrGMMQkCLOc8xSvoQMbFGNhuPoUNnWdfv+touxG97ll30GmNJgp6NiAhQ18A8rveg8C28T1kNF8JAtQ2kbDpw+6jTEhLyoT7mWSpgg4A6Ub3MfrzR1XmK6Y21Ve9Vvv1XbvlqccqoZI/gPOeiJQdq+xxpTbNhuXYjnNSswzNsLSGdazCo0hA+b4WUM7h1RXg99o5jK6YHMRddr071+v273o37deTu3ZvOO6OQENh8/lNygK1qR2rWcbhoDYcB3IY9apmBo1q3bTtqkNr9SpzGLV1avjUaag/KagcJ3zGI4/MkFIk6HcHN0rxJ6B9MGE6BQ8d/R8cwCQPWSpJuEKH+kvDfmkY2GrqNXzZR2gPfdQhIZkxtI/Q31pyW9CDBAAA'

const decodeNBT = async function (data) {
	const buffer = Buffer.from(data, 'base64')
	const item = await parseNbt(buffer)

	if (item === undefined) {
		return null
	}

	return item.value.i.value.value[0]
}

async function print() {
	const { tag } = await decodeNBT(item_bytes)
	var data = tag.value

	console.log(data.SkullOwner.value, data.display.value, data.ExtraAttributes.value)
}

print()
