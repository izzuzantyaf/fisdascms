import { GetServerSideProps } from "next"
import Head from "next/head"
import { Route } from "../../lib/constants"
import * as jwt from "jsonwebtoken"
import {
  Button,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { codeOfConductService } from "../../services/code-of-conduct"
import PageLayout from "../../layouts/page-layout"
import shadowedBoxStyle from "../../chakra-style-props/shadowed-box"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const admin = jwt.decode(context.req.cookies.jwt)
  console.log("Admin :", admin)
  if (!admin)
    return {
      redirect: {
        destination: Route.SIGN_IN,
      },
    }
  return {
    props: {
      admin,
    },
  }
}

export default function CodeOfCoductPage() {
  const [isCodeOfConductUpdating, setIsCodeOfConductUpdating] = useState(false)
  const [codeOfConductState, setCodeOfConductState] = useState()
  const toast = useToast()

  useEffect(() => {
    const getCodeOfConduct = async () => {
      const baba = await codeOfConductService.getAll()
      setCodeOfConductState(baba)
    }
    getCodeOfConduct()
  }, [])

  const handleUpdateCodeOfConduct = async () => {
    const newCodeOfConduct = {
      _id: codeOfConductState._id,
      url: codeOfConductState.url,
    }
    setIsCodeOfConductUpdating(true)
    const updateResponse = await codeOfConductService.update(newCodeOfConduct)
    setIsCodeOfConductUpdating(false)
    if (!updateResponse.isSuccess) {
      toast({
        title: updateResponse.message,
        status: "error",
      })
      return
    }
    setCodeOfConductState(updateResponse?.data?.updatedCodeOfConduct)
    toast({
      title: updateResponse.message,
      status: "success",
    })
  }

  return (
    <>
      <Head>
        <title>Fisdas CMS | Tata Tertib</title>
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
          <Skeleton isLoaded={codeOfConductState}>
            <iframe
              src={codeOfConductState?.previewUrl}
              width="100%"
              height="256px"
            ></iframe>
          </Skeleton>
          <form action="#">
            <Skeleton isLoaded={codeOfConductState}>
              <Input
                type="url"
                placeholder="Link Google Drive dokumen tata tertib"
                defaultValue={codeOfConductState?.url}
                onFocus={(e) => e.target.select()} //* select all ketika user klik input field
                onChange={(e) =>
                  setCodeOfConductState({
                    ...codeOfConductState,
                    url: e.target.value,
                  })
                }
              />
            </Skeleton>
            <Button
              type="submit"
              colorScheme="blue"
              width="full"
              marginTop={4}
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
