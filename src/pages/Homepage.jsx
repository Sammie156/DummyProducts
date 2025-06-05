import BannerSlider from "../components/BannerSlider";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import ProductSlide from "../components/ProductSlide";

function Homepage() {
    return (
        <>
            <HeroBanner />
            <BannerSlider />
            <ProductSlide />
            <Footer />
        </>
    )
}

export default Homepage;