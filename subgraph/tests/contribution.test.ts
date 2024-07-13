import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { ContributionAdded } from "../generated/schema"
import { ContributionAdded as ContributionAddedEvent } from "../generated/Contribution/Contribution"
import { handleContributionAdded } from "../src/contribution"
import { createContributionAddedEvent } from "./contribution-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let nodeId = "Example string value"
    let ipfsHash = "Example string value"
    let newContributionAddedEvent = createContributionAddedEvent(
      user,
      nodeId,
      ipfsHash
    )
    handleContributionAdded(newContributionAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ContributionAdded created and stored", () => {
    assert.entityCount("ContributionAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ContributionAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ContributionAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nodeId",
      "Example string value"
    )
    assert.fieldEquals(
      "ContributionAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "ipfsHash",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
