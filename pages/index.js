import { createClient } from "contentful";
import RecipeCard from "../components/RecipeCard";

export const getStaticProps = async () => {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  });

  const response = await client.getEntries({ content_type: "recipe" });

  return {
    props: { recipes: response.items },
    revalidate: 1,
  };
};

export default function Recipes({ recipes }) {
  // console.log(recipes);
  return (
    <div className="recipe-list">
      {/* {recipes.map((recipe) => {
        return <div key={recipe.sys.id}>{recipe.fields.title}</div>;
      })} */}
      {recipes.map((recipe) => {
        return <RecipeCard key={recipe.sys.id} recipe={recipe} />;
      })}
      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  );
}
