import { MongoClient, ServerApiVersion } from "mongodb";

import MeetupList from "@/components/meetups/MeetupList"

const uri = "mongodb+srv://<username>:<password>@cluster0.1y6ht.mongodb.net/meetupsDB?retryWrites=true&w=majority&appName=Cluster0";

async function HomePage() {
  let meetups = []
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
    let data = await collection.find({}).toArray();

    meetups = data.map(meetup => ({
      ...meetup,
      id: meetup._id.toString()
    }))
  } catch (error) {
    console.log(error);
  } finally {
    if(client) {
      client.close();
    }
  }

  return <MeetupList meetups={meetups} />
}

export const metadata = {
  title: "React Meetups",
  description: "A place where you can find all meetups related to React"
}

export default HomePage