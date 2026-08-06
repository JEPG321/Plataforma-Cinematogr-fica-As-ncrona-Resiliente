import { HomeExperience } from "@/components/home-experience";
import { loadHomeData } from "@/utils/loadHomeData";

export const dynamic = "force-dynamic";

export default async function Page() {
  try {
    const homeData = await loadHomeData();

    return (
      <HomeExperience
        initialHomeData={homeData}
        initialLoadFailed={false}
      />
    );
  } catch (error) {
    console.error("Server home load failed:", error);

    return (
      <HomeExperience
        initialHomeData={null}
        initialLoadFailed={true}
      />
    );
  }
}
