import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Group, Title } from "@mantine/core";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const Navbar = () => {
  return (
    <Container fluid p="sm" style={{ backgroundColor: 'transparent' }}>
      <Group justify="space-between" align="center">
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative', marginRight: '1rem', marginLeft: '1rem'}}>
            <Image
              alt="Logo"
              width={50}
              height={50}
              src="/govtechLogo.png"
            />
          </div>
          <Title order={1} style={{ fontSize: '24px', fontWeight: 'bold', color: 'black' }}>
            GT LLM
          </Title>
        </Link>
      </Group>
    </Container>
  );
};
