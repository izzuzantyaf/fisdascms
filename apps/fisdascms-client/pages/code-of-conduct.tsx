import Head from "next/head"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  useToast,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { codeOfConductService } from "../core/services/code-of-conduct.service"
import PageLayout from "../layouts/page-layout"
import shadowedBoxStyle from "../chakra-style-props/shadowed-box"
import {
  CodeOfConduct,
  CodeOfConductValidationError,
} from "../core/types/code-of-conduct.type"

export default function CodeOfCoductPage() {
  const [isCodeOfConductUpdating, setIsCodeOfConductUpdating] = useState(false)
  const [codeOfConductState, setCodeOfConductState] = useState<CodeOfConduct>()
  const toast = useToast()
  const [validationError, setValidationError] =
    useState<CodeOfConductValidationError>()
  const [canSubmit, setCanSubmit] = useState(false)

  const hadndleGetCodeOfConduct = async () => {
    const codeOfConduct = await codeOfConductService.getAll()
    setCodeOfConductState(codeOfConduct)
  }

  const handleUpdateCodeOfConduct = async () => {
    setIsCodeOfConductUpdating(true)
    const updateResponse = await codeOfConductService.update({
      _id: codeOfConductState?._id as string,
      url: codeOfConductState?.url,
    })
    setIsCodeOfConductUpdating(false)
    if (!updateResponse.isSuccess) {
      setValidationError(updateResponse.data.errors)
      toast({
        title: updateResponse.message,
        status: "error",
      })
      return
    }
    setValidationError(undefined)
    setCodeOfConductState(updateResponse?.data)
    toast({
      title: updateResponse.message,
      status: "success",
    })
    setCanSubmit(false)
  }

  useEffect(() => {
    hadndleGetCodeOfConduct()
  }, [])

  return (
    <>
      <Head>
        <title>Tata Tertib | Fisdas CMS</title>
      </Head>
      <PageLayout>
        <Heading marginTop="4">Tata tertib</Heading>
        <SimpleGrid
          columns={[1, 2]}
          gap={4}
          marginTop="4"
          padding="4"
          {...shadowedBoxStyle}
        >
          <Skeleton isLoaded={codeOfConductState ? true : false}>
            <iframe
              src={codeOfConductState?.previewUrl}
              width="100%"
              height="256px"
            ></iframe>
          </Skeleton>
          <form>
            <Skeleton isLoaded={codeOfConductState ? true : false}>
              <FormControl isInvalid={validationError?.url ? true : false}>
                <FormLabel>Link file</FormLabel>
                <Input
                  type="url"
                  placeholder="Link Google Drive file tata tertib"
                  defaultValue={codeOfConductState?.url}
                  onFocus={(e) => e.target.select()} //* select all ketika user klik input field
                  onChange={(e) => {
                    setCodeOfConductState((prevState) => {
                      prevState.url = e.target.value
                      return prevState
                    })
                    setCanSubmit(true)
                  }}
                />
                {validationError?.url ? (
                  <FormErrorMessage>{validationError.url}</FormErrorMessage>
                ) : null}
              </FormControl>
            </Skeleton>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              marginTop={4}
              isDisabled={!canSubmit}
              isLoading={isCodeOfConductUpdating}
              onClick={(e) => {
                e.preventDefault()
                handleUpdateCodeOfConduct()
              }}
            >
              Simpan
            </Button>
          </form>
        </SimpleGrid>
      </PageLayout>
    </>
  )
}
