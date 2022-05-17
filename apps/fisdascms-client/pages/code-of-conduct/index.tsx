import { GetServerSideProps, InferGetServerSidePropsType } from "next"
import Head from "next/head"
import { Route } from "../../lib/constants"
import * as jwt from "jsonwebtoken"
import Link from "next/link"
import { Button, Input, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { codeOfConductService } from "../../services/code-of-conduct"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const admin = jwt.decode(context.req.cookies.jwt)
  console.log("Admin :", admin)
  if (!admin)
    return {
      redirect: {
        destination: Route.SIGN_IN,
      },
    }
  const codeOfConduct = await codeOfConductService.getAll()
  return {
    props: {
      admin,
      codeOfConduct,
    },
  }
}

export default function CodeOfCoductPage({
  codeOfConduct,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [isCodeOfConductUpdating, setIsCodeOfConductUpdating] = useState(false)
  const [codeOfConductState, setCodeOfConductState] = useState(codeOfConduct)

  const toast = useToast()

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
        <meta name="description" content="Website CMS Lab Fisika Dasar Tel-U" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Link href={Route.HOME}>Dashboard</Link>
      <iframe src={codeOfConductState.previewUrl} width="100%"></iframe>
      <form action="#">
        <Input
          type="url"
          placeholder="Link Google Drive dokumen tata tertib"
          defaultValue={codeOfConductState.url}
          onFocus={(e) => e.target.select()} //* select all ketika user klik input field
          onChange={(e) =>
            setCodeOfConductState({
              ...codeOfConductState,
              url: e.target.value,
            })
          }
        ></Input>
        <Button
          type="submit"
          colorScheme="blue"
          isLoading={isCodeOfConductUpdating}
          onClick={(e) => {
            e.preventDefault()
            handleUpdateCodeOfConduct()
          }}
        >
          Simpan
        </Button>
      </form>
    </>
  )
}
