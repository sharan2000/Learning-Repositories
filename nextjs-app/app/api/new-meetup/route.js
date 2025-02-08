import { MongoClient, ServerApiVersion } from "mongodb";


const uri = "mongodb+srv://<username>:<password>@cluster0.1y6ht.mongodb.net/meetupsDB?retryWrites=true&w=majority&appName=Cluster0";

export async function POST(req) {
  console.log(`In api path -- ${req.url}`);
  let client
  let responseBody
  let status

  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    })

    let body = await req.json();

    client.connect();
    let db = client.db();
    let collection = db.collection("meetups");
    await collection.insertOne(body);

    responseBody = {
      message: 'New meetup created successfully'
    }
    status = 201
  } catch (error) {
    console.log(error);

    responseBody = {
      message: 'Internal server error'
    }
    status = 500
  } finally {
    if(client) {
      client.close();
    }
  }

  return new Response(JSON.stringify(responseBody), { status })
}