import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    const requiredFields = [
      'studentId', 'firstName', 'lastName', 'email', 'academicYear', 
      'fieldOfStudy', 'preferredDepartment', 'motivation','homeAddress'
    ];
    
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    // Check if student ID already exists
    const { data: existingStudent, error: checkError } = await supabase
      .from('join_applications')
      .select('student_id')
      .eq('student_id', data.studentId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { 
      return NextResponse.json({ error: 'Database error during validation.' }, { status: 500 });
    }

    if (existingStudent) {
      return NextResponse.json({ error: 'Student ID already registered.' }, { status: 409 });
    }

    // Prepare data for insertion
    const insertData = {
      student_id: data.studentId,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      discord_id: data.discordId || null,
      telegram_id: data.telegramId || null,
      academic_year: data.academicYear,
      field_of_study: data.fieldOfStudy,
      preferred_department: data.preferredDepartment,
      motivation: data.motivation,
      experience: data.experience || null,
      home_address: data.homeAddress,
      registration_date: new Date().toISOString(),
      status: 'pending'
    };

    // Insert into Supabase
    const { data: insertResult, error: dbError } = await supabase
      .from('join_applications')
      .insert([insertData])
      .select();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        error: 'Database error: ' + dbError.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Registration received and saved successfully.',
      data: insertResult[0]
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ 
      error: 'Invalid request or server error.' 
    }, { status: 400 });
  }
}