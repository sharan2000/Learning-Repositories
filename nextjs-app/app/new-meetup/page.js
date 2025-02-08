"use client"

import NewMeetupForm from "@/components/meetups/NewMeetupForm"
import { useRouter } from "next/navigation"

const NewMeetupPage = () => {
  let router = useRouter();

  const addMeetup = async (data) => {
    let response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
  
    response = await response.json()
  
    console.log(response);

    router.push("/");
  }

  return <NewMeetupForm onAddMeetup={addMeetup} />
}


export default NewMeetupPage;