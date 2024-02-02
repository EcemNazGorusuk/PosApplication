import { Button, Form, Input, Carousel, Checkbox, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import statisticImg from "../../../src/assets/statistic.svg";
import responsiveImg from "../../../src/assets/responsive.svg";
import responsiveImg2 from "../../../src/assets/responsive3.png";

import customerImg from "../../../src/assets/customer.svg";
import adminImg from "../../../src/assets/admin.svg";
import AuthCarousel from "./AuthCarousel";
import { useState } from "react";

const Login = () => {
  const [form] = Form.useForm(); //bu hook form alanını yönetmek için

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  //POST USER LOGIN
  const onFinish = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/auth/login", {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });

     
      const user=await res.json();//fetch bilgisini tutar
      console.log("user name: ",user.username);
      console.log("user email: ",user.email);

      if (res.status === 200) {
        //işlem başarılıysa login sayfasına yönlendir
         //login işlemini localde tutmak
         localStorage.setItem("userStorage",JSON.stringify({
          username:user.username,
          email:user.email
         }))
        message.success(`Hoşgeldin ${user.username}! `);
        navigate("/");
      
      }
      else if (res.status === 404) {
        //kullanıcı bulunamadı hatası alındıysa
        message.error(`Kullanıcı bulunamadı!`);
        
      }
      else if (res.status === 403) {
        //şifre hatası alındıysa
        message.error(`Şifre hatalı!`);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="xl:px-20 px-10 w-full flex flex-col h-full justify-center relative">
          <h1 className="text-center text-5xl font-bold mb-2 logo-register-container text-white">
            LOGO
          </h1>
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
          >
            <Form.Item
              label="E-mail"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "E-mail Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre Alanı Boş Bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name={"remember"} valuePropName="checked">
              <div className="flex gap-4 justify-between">
                <Checkbox>Remember me </Checkbox>
                <Link to={"/"}>Forgot password?</Link>
              </div>
            </Form.Item>
            <Form.Item>
              <Button
                loading={loading}
                htmlType="submit"
                className="flex  justify-center gap-3 w-full text-white bg-gradient-to-r from-[#e55050]  via-[#ef8c8c] to-[#e55050] font-[800] text-sm rounded-lg hover:text-white hover:bg-gradient-to-br hover:from-[#b9b4e7] hover:to-[#c7d5f3]"
              >
                <div>Giriş Yap</div>
              </Button>
            </Form.Item>
          </Form>
          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu?&nbsp;
            <Link to="/register" className="text-blue-600">
              Şimdi kayıt ol
            </Link>
          </div>
        </div>

        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-gradient-to-r from-[#8D6BF0] to-[#593DAB] bg-cover h-full relative">
          <div className="w-full h-full flex items-center ">
            <div className="w-full relative ">
              <Carousel className="!h-full px-6" autoplay autoplaySpeed={3000}>
                <AuthCarousel
                  img={responsiveImg2}
                  title="Responsive"
                  desc="Tüm Cihaz Boyutlarıyla Uyumluluk"
                />
                <AuthCarousel
                  img={statisticImg}
                  title="İstatistikler"
                  desc="Geniş Tutulan İstatistikler"
                />
                <AuthCarousel
                  img={customerImg}
                  title="Müşteri Memnuniyeti"
                  desc="Deneyim Sonunda Üründen Memnun Müşteriler"
                />
                <AuthCarousel
                  img={adminImg}
                  title="Yönetici Paneli"
                  desc="Tek Yerden Yönetim"
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
