import { NextResponse } from "next/server";

export async function GET(){
    try {
      let response =   NextResponse.json({
            message : "logout  is successful",
            success:true
        })
     response.cookies.set("token" , "",{
        httpOnly:true , expires:new Date(0)});

        return response;
    } catch (error:any) {
        return NextResponse.json({error : error.message})
        
    }
}