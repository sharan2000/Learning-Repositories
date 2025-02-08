import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Fragment } from "react";

const uri = "mongodb+srv://<username>:<password>@cluster0.1y6ht.mongodb.net/meetupsDB?retryWrites=true&w=majority&appName=Cluster0";

async function MeetupDetailsPage(props) {
  let params = await props.params
  let meetUpId = params.meetupId

  let meetUpDetails
  let client
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })

    client.connect();
    let db = client.db();
    let collection = db.collection("meetups");
    let data = await collection.findOne({_id: new ObjectId(meetUpId)});

    meetUpDetails = {
      ...data,
      id: data._id.toString() 
    }
  } catch (error) {
    console.log(error);
  } finally {
    if(client) {
      client.close();
    }
  }

  return <MeetupDetail 
    image={meetUpDetails.image}
    title={meetUpDetails.title}
    address={meetUpDetails.address}
    description={meetUpDetails.description}
  />
}

export const dynamicParams = true
export async function generateStaticParams() {
  let details
  let client
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })

    client.connect();
    let db = client.db();
    let collection = db.collection("meetups");
    let data = await collection.find({}, { _id: 1 }).toArray();

    details = data.map(meetup => ({
      meetupId: meetup._id.toString()
    }))
  } catch (error) {
    console.log(error);
  } finally {
    if(client) {
      client.close();
    }
  }

  return details
}

export default MeetupDetailsPage;