import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Example: Save to database here (replace with your DB logic)
export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Validate required fields
    const requiredFields = [
      'studentId', 'firstName', 'lastName', 'email', 'academicYear', 'fieldOfStudy', 'preferredDepartment', 'motivation'
    ];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
    }
    // Insert into Supabase
    const { error: dbError } = await supabase
      .from('students')
      .insert([
        {
          student_id: data.studentId,
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          academic_year: data.academicYear,
          field_of_study: data.fieldOfStudy,
          preferred_department: data.preferredDepartment,
          motivation: data.motivation,
          experience: data.experience,
          agree_to_terms: true,
        },
      ]);
    if (dbError) {
      return NextResponse.json({ error: 'Database error: ' + dbError.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, message: 'Registration received and saved.' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
