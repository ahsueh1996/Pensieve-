// import { ApolloClient, ApolloLink, InMemoryCache, Observable } from '@apollo/client'
// import { ComposeClient } from '@composedb/client'

// // Path to compiled composite
// import { definition } from './__generated__/definition.js'

// const compose = new ComposeClient({ ceramic: 'http://localhost:7007', definition })

// // Create custom ApolloLink using ComposeClient instance to execute operations
// const link = new ApolloLink((operation) => {
//   return new Observable((observer) => {
//     compose.execute(operation.query, operation.variables).then(
//       (result) => {
//         observer.next(result)
//         observer.complete()
//       },
//       (error) => {
//         observer.error(error)
//       }
//     )
//   })
// })

// // Use ApolloLink instance in ApolloClient config
// export const client = new ApolloClient({ cache: new InMemoryCache(), link })