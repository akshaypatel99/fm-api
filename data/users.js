import bcrypt from 'bcryptjs';

const users = [
	{
		name: 'Admin User',
		email: 'akshaypatel99@gmail.com',
		password: bcrypt.hashSync('123456', 12),
		isAdmin: true,
	},
	{
		name: 'Lolly P',
		email: 'lolly@example.com',
		password: bcrypt.hashSync('123456', 12),
	},
	{
		name: 'Kaskae G',
		email: 'kaskae@example.com',
		password: bcrypt.hashSync('123456', 12),
	},
];

export default users;
