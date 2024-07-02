import { Header, StoreList } from "@/components";
import Map from "@/components/Map";

const StoresView = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <div className="max-lg:hidden flex-shrink-0 w-1/3 max-w-[400px] h-full p-4">
          {<StoreList />}
        </div>
        <div className="flex-grow w-[70%] h-full ">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default StoresView;
