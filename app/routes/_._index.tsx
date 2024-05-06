import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { register } from "swiper/element/bundle";

register();
export let loader: LoaderFunction = async ({ request }) => {
  const subdomain = request.headers.get("host")?.split(".")[0];
  return { subdomain };
};
export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="relative">
      <div className="bg-[#13357b] absolute -z-10 pointer-events-none w-full">
        <img
          alt="image"
          src="https://gotrip-appdir.vercel.app/img/masthead/2/bg.png"
          className="h-[500px] w-full"
        />
      </div>
      <div className="max-w-[1200px] mx-auto pt-40">
        <div className="flex">
          <div className="w-1/2">
            <h1 className="text-white text-[60px] font-semibold pt-20">
              <span className="text-[#f8d448]">Tìm sân</span>
              <br />
              Quá dễ dàng nha
            </h1>
            <p className="text-white">Website đặt thuê sân bóng online</p>
          </div>
          <div className="w-1/2 grid grid-rows-2 grid-cols-2 gap-4">
            <div className="row-span-2">
              <img
                src="/images/banner1.avif"
                className="w-full h-full object-cover rounded-md"
                alt=""
              />
            </div>
            <div className="col-span-1">
              <img
                src="/images/banner3.avif"
                className="w-full h-full object-cover rounded-md"
                alt=""
              />
            </div>
            <div className="row-span-1 col-span-1">
              <img
                src="/images/banner2.avif"
                className="w-full h-full object-cover rounded-md"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 max-w-[1320px] mx-auto my-5">
        <div className="p-[50px] hover:shadow-lg transition rounded">
          <div className="flex justify-center">
            <img
              src="/images/shipping1.svg"
              alt="image"
            />
          </div>
          <div className="text-center mt-[30px]">
            <h4 className="text-md font-medium fw-500">Giá tốt</h4>
            <p className=" mt-[10px] text-[#697488]">
            Sân bóng với giá cả phải chăng, đảm bảo bạn luôn có trải nghiệm thú vị mà không lo về chi phí.
            </p>
          </div>
        </div>
        <div className="p-[50px] hover:shadow-lg transition rounded">
          <div className="flex justify-center">
            <img
              src="/images/shipping2.svg"
              alt="image"
            />
          </div>
          <div className="text-center mt-[30px]">
            <h4 className="text-md font-medium fw-500">
              Đặt sân nhanh và dễ dàng
            </h4>
            <p className=" mt-[10px] text-[#697488]">
            Đặt sân chỉ trong vài bước đơn giản, giúp bạn tiết kiệm thời gian và nâng cao trải nghiệm của mình.
            </p>
          </div>
        </div>
        <div className="p-[50px] hover:shadow-lg transition rounded">
          <div className="flex justify-center">
            <img
              src="/images/shipping3.svg"
              alt="image"
            />
          </div>
          <div className="text-center mt-[30px]">
            <h4 className="text-md font-medium fw-500">Chăm sóc khách hàng</h4>
            <p className=" mt-[10px] text-[#697488]">
            Chúng tôi luôn ở đây để hỗ trợ bạn, trải nghiệm của bạn luôn được quan tâm và cải thiện.
            </p>
          </div>
        </div>
      </div>
      {/* <div>
        <swiper-container
          // style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
          class="mySwiper"
          thumbs-swiper=".mySwiper2"
          space-between="10"
          navigation="true"
        >
          <swiper-slide>
            <div>Sang</div>
          </swiper-slide>
          <swiper-slide>
            <div>Sang</div>
          </swiper-slide>
          <swiper-slide>
            <div>Sang</div>
          </swiper-slide>
          <swiper-slide>
            <div>Sang</div>
          </swiper-slide>
        </swiper-container>
      </div>
      <iframe
        src="https://thoitiet.app/widget/embed/ha-noi?style=1&day=7&td=%23003870&ntd=%23ff0000&mvb=%23959dad&mv=%23ff0000&mdk=%23dddddd&htd=true"
        id="widgeturl"
        width="500px"
        height="550px"
        scrolling="no"
        frameborder="0"
        allowtransparency="true"
      ></iframe> */}
    </div>
  );
}
