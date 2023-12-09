import { v4 } from 'uuid';

import anyBase from 'any-base';

export default function ()
{
	const uuid = v4();

	return anyBase(anyBase.HEX, "0123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ")(uuid.toLowerCase().replace(/-/g,''));
}