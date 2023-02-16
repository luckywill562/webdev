const { SubscriptionClient } = require('subscriptions-transport-ws')
const fetch = require('node-fetch')
const gql = require('graphql-tag')

const { ApolloClient } = require('apollo-client')

const { InMemoryCache } = require('apollo-cache-inmemory')
const { createHttpLink } = require('apollo-link-http');

const ws = require('ws')

const client = new SubscriptionClient('ws://localhost:4000/subscriptions', {
  reconnect: true,
}, ws);

const apolloClient = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:4000/graphql', fetch }),
  cache: new InMemoryCache(),
  networkInterface: client,
});

apolloClient.subscribe({
  query: gql`
  subscription MessageSub($id: ID){
    newMessage(conversation_id: $id){
      id
      subject
      sender_id
      receiver_id
      conversation_id
    }
  }`,
  variables: {id:25}
}).subscribe({
  next (data) {
    // Notify your application with the new arrived data
    console.log(`oh new data...${JSON.stringify(data)}`)
  }
});

setTimeout(() => {
  apolloClient.query({
    query: gql`
      {
        retrieveDocument {
          id
        }
      }
    `
  }).then((result) => console.log(`res2 ${JSON.stringify(result)}`))
}, 1000)
