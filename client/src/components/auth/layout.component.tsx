import { Outlet } from "react-router-dom";
import cinema from "../../assets/cinema.jpg";

const AuthLayout = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={cinema}
                    alt="cinema"
                    className="w-full h-full object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8">
                <div
                    className="
                        max-w-[1400px]
                        max-h-screen
                        h-full
                        mx-auto
                        flex
                        items-center
                        justify-center lg:justify-end
                        py-6
                    "
                >
                    <div
                        className="
                            w-full
                            sm:w-[90%]
                            md:w-[75%]
                            lg:w-[45%]
                            xl:w-[38%]
                            h-auto
                            min-h-[400px]
                            lg:max-h-[90%]
                            p-5 sm:p-6 md:p-8
                            bg-white/20
                            backdrop-blur-xl
                            border border-white/20
                            rounded-2xl
                            shadow-2xl
                            overflow-y-auto
                            hide-scrollbar
                        "
                    >
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;