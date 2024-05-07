import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { Layout } from "@/components/Layout";

import { Bounded } from "@/components/Bounded";
import { Article } from "@/components/Article";

export async function generateMetadata({ params }) {
  const client = createClient();
  const settings = await client.getSingle("settings");
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return {
    title: `${prismic.asText(page.data.title)} | ${prismic.asText(
      settings.data.name,
    )}`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title,
      images: [
        {
          url: page.data.meta_image.url,
        },
      ],
    },
  };
}

export default async function Page({ params }) {
  const client = createClient();
  const navigation = await client.getSingle("navigation");
  const settings = await client.getSingle("settings");


  if(params.uid==="blog"){
    const articles = await client.getAllByType("article", {
      orderings: [
        { field: "my.article.publishDate", direction: "desc" },
        { field: "document.first_publication_date", direction: "desc" },
      ],
    });  
    return (
      <Layout
        withHeaderDivider={false}
        navigation={navigation}
        settings={settings}
      >
        <Bounded size="widest">
          <ul className="grid grid-cols-1 gap-16">
            {articles.map((article) => (
              <Article key={article.id} article={article} />
            ))}
          </ul>
        </Bounded>
      </Layout>
    );
  }else{
    const page = await client.getByUID("page", params.uid).catch(() => notFound());
    return (
      <Layout navigation={navigation} settings={settings}>
        <SliceZone slices={page.data.slices} components={components} />
      </Layout>
    );
  }
  
}

export async function generateStaticParams() {
  const client = createClient();

  const pages = await client.getAllByType("page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
