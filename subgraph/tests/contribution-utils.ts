import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ContributionAdded,
  EdgeAdded,
  NodeAdded,
  NodeFinished,
  RfpAdded,
  TechTreeAdded,
  TechTreeUpdated,
  TreasuryAdded
} from "../generated/Contribution/Contribution"

export function createContributionAddedEvent(
  user: Address,
  nodeId: string,
  ipfsHash: string
): ContributionAdded {
  let contributionAddedEvent = changetype<ContributionAdded>(newMockEvent())

  contributionAddedEvent.parameters = new Array()

  contributionAddedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  contributionAddedEvent.parameters.push(
    new ethereum.EventParam("nodeId", ethereum.Value.fromString(nodeId))
  )
  contributionAddedEvent.parameters.push(
    new ethereum.EventParam("ipfsHash", ethereum.Value.fromString(ipfsHash))
  )

  return contributionAddedEvent
}

export function createEdgeAddedEvent(
  techTreeId: BigInt,
  source: string,
  target: string
): EdgeAdded {
  let edgeAddedEvent = changetype<EdgeAdded>(newMockEvent())

  edgeAddedEvent.parameters = new Array()

  edgeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "techTreeId",
      ethereum.Value.fromUnsignedBigInt(techTreeId)
    )
  )
  edgeAddedEvent.parameters.push(
    new ethereum.EventParam("source", ethereum.Value.fromString(source))
  )
  edgeAddedEvent.parameters.push(
    new ethereum.EventParam("target", ethereum.Value.fromString(target))
  )

  return edgeAddedEvent
}

export function createNodeAddedEvent(
  nodeId: string,
  techTreeId: BigInt,
  title: string,
  nodeType: string
): NodeAdded {
  let nodeAddedEvent = changetype<NodeAdded>(newMockEvent())

  nodeAddedEvent.parameters = new Array()

  nodeAddedEvent.parameters.push(
    new ethereum.EventParam("nodeId", ethereum.Value.fromString(nodeId))
  )
  nodeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "techTreeId",
      ethereum.Value.fromUnsignedBigInt(techTreeId)
    )
  )
  nodeAddedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  nodeAddedEvent.parameters.push(
    new ethereum.EventParam("nodeType", ethereum.Value.fromString(nodeType))
  )

  return nodeAddedEvent
}

export function createNodeFinishedEvent(nodeId: string): NodeFinished {
  let nodeFinishedEvent = changetype<NodeFinished>(newMockEvent())

  nodeFinishedEvent.parameters = new Array()

  nodeFinishedEvent.parameters.push(
    new ethereum.EventParam("nodeId", ethereum.Value.fromString(nodeId))
  )

  return nodeFinishedEvent
}

export function createRfpAddedEvent(
  nodeId: string,
  _ipfsHash: string
): RfpAdded {
  let rfpAddedEvent = changetype<RfpAdded>(newMockEvent())

  rfpAddedEvent.parameters = new Array()

  rfpAddedEvent.parameters.push(
    new ethereum.EventParam("nodeId", ethereum.Value.fromString(nodeId))
  )
  rfpAddedEvent.parameters.push(
    new ethereum.EventParam("_ipfsHash", ethereum.Value.fromString(_ipfsHash))
  )

  return rfpAddedEvent
}

export function createTechTreeAddedEvent(
  techTreeId: BigInt,
  title: string
): TechTreeAdded {
  let techTreeAddedEvent = changetype<TechTreeAdded>(newMockEvent())

  techTreeAddedEvent.parameters = new Array()

  techTreeAddedEvent.parameters.push(
    new ethereum.EventParam(
      "techTreeId",
      ethereum.Value.fromUnsignedBigInt(techTreeId)
    )
  )
  techTreeAddedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )

  return techTreeAddedEvent
}

export function createTechTreeUpdatedEvent(
  techTreeId: BigInt
): TechTreeUpdated {
  let techTreeUpdatedEvent = changetype<TechTreeUpdated>(newMockEvent())

  techTreeUpdatedEvent.parameters = new Array()

  techTreeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "techTreeId",
      ethereum.Value.fromUnsignedBigInt(techTreeId)
    )
  )

  return techTreeUpdatedEvent
}

export function createTreasuryAddedEvent(
  nodeId: string,
  amount: BigInt
): TreasuryAdded {
  let treasuryAddedEvent = changetype<TreasuryAdded>(newMockEvent())

  treasuryAddedEvent.parameters = new Array()

  treasuryAddedEvent.parameters.push(
    new ethereum.EventParam("nodeId", ethereum.Value.fromString(nodeId))
  )
  treasuryAddedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return treasuryAddedEvent
}
