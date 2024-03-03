"use server";

import { db } from "~/server/db";
import { type NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcrypt";

interface IUser {
	name: string;
	email: string;
	password: string;
}

export async function POST(request: NextRequest) : Promise<NextResponse> {

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data: IUser = await request.json();

	const { name, email, password } = data;
	console.log("Route Handler", data);

	// check if all fields are filled
	if (!name || !email || !password) {
		console.log("Invalid data");
		return NextResponse.json({ message: "Invalid data" }, { status: 400 });
	}

	// check if email is already in use
	const doesUserExist = await db.user.findUnique({
		where: {
			email: email
		}
	});

	if (doesUserExist) {
		console.log("User already exists");
		return NextResponse.json({ message: "User already exists" }, { status: 400 });
	}

	// hash password
	// const hashedPassword = await bcrypt.hash(password, 10);

	// create user
	const user = await db.user.create({
		data: {
			name,
			email,
			// hashedPassword,
		},
	});

	return NextResponse.json({ message: "teste" });
}

/* 
export const createUser = async (data: {
	name: string;
	email: string;
	password: string;
  }) => {
	// check if all fields are filled
	if (!data.name || !data.email || !data.password) {
		console.log("Invalid data");
		return;
	}

	// check if email is already in use
	const doesUserExist = await db.user.findUnique({
		where: {
			email: data.email
		}
	});
	
	if (doesUserExist) {
		console.log("User already exists");
		return;
	}

	// hash password
	// const hashedPassword = await bcrypt.hash(password, 10);

	// create user
	const newUser = await db.user.create({
		data: {
			name: data.name,
			email: data.email,
			// hashedPassword: data.password
		}
	});

	console.log(`Usuário ${data.email} criado`);
	return;

};
*/