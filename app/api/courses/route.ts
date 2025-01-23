import { NextResponse } from 'next/server';
import connectMongoDB from '@/libs/mongodb';
import Course from '@/models/Course';

export async function GET() {
  try {
    await connectMongoDB();
    const courses = await Course.find();
    return NextResponse.json(courses);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching courses' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectMongoDB();
    const courseData = await request.json();
    const newCourse = new Course(courseData);
    await newCourse.save();
    return NextResponse.json(newCourse, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating course' }, { status: 500 });
  }
}
