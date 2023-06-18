# Pensieve~
 
## Overview

Some of us take too many photos and videos of our lifes that our phone is constantly out of storage. Some of these are great photos and some are blurry duplicates of an exciting moments that are junk to human eyes nows; however, potentially useful data in the future for machine learning and AI computer vision algorithms in reconsctructing immersive moments of your memories. How about a dApp to save them ALL - save all those memories like Dumbledore's pensieve....

Pensieve is a decentralized file storage to recreate your those moments in your memories and share with others. As you upload these memories, you can also choose to take part in the documentation of the HISTORY OF APES (HOMO SAPIENS).

## Memory Token Actions on FVM
1. Anyone can add an Event by registering a POAP.
2. POAP NFT grants par<ticipants access to read and add data (CID) to that Event.
3. Non-participants, who want to read data about an Event, can propose deals where POAP holders of that Event can vote to decide whether to accept them. 
4. Deal reward will get a split amount the POAP holders who have contributed (e.g. uploaded photos) to reconstruct that shared memory.
5. (NOT DONE YET) People can vote on significance of the event and the events with significance score above a threshold will form our decentralised "HISTORY OF APES".
6. (NOT DONE YET) Anyone can challenge to say a piece of data is fake. If they are wrong, they lose their stake. If they are right, they claim their stake and the data uploader's penalty.

## Data Flow and Technologies 
1. The user connects on Filecoin network (calibration testnet) to the dApp through the Dataverse Wallet (their address will get resolved to their ENS name on Ethereum (goerli) testnet).
2. This grants the dApp access to that user’s encrypted storage (via Lit Protocol’s Lit Action) on Ceramic ComposeDB (with the bulky files like images on IPFS)
3. Once connected, the user can interact with Pensieve Dao’s smart contracts on Filecoin’s FVM!
3. The user can register a new event, thereby getting read and write access to that event, by proving their ownership of POAP NFT of that event (the algo groups photos based on POAP). The POAP NFTs for demo are created on FVM with their metadata stored on NFT.Storage.
4. When users upload photos, the photos are encoded then passed to Bacalhau’s containerized machine learning image processing flow which runs segmentation and timestamp photos based on Filecoin’s tipset height (queried from Beryx API). Bacalhau stores the processed output on IPFS.
5. The client frontend queries the processed images from IPFS optimzed via Filecoin Saturn CDN. However, this CDN integration currently seems broken :(

## Some Future Directions
1. Fix integration bugs and optimise integration flow (communication with Bacalhau is very slow right now!)
2. Allow people to vote on significance of the event and the events with significance score above a threshold will form our decentralised "HISTORY OF APES".
3. Allow people to challenge the data’s “trueness”. So that people cannot upload AI-generated fake pictures of things that never happened. 

See our project trello board for a list of ideas that we never got to finish implementing!
