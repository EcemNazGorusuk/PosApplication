import React  from "react";
import { Form, Input, Select, Card, message } from "antd";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCart,
} from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
export default function CreateBill({ open, handleOk, handleCancel, setOpen }) {
  //Form.Item da tutulan müşteri adı,telefon no ve ödeme türü alanlarını onFinish içindeki values ile doğrudan alabiliriz:

  //redux show in cart create bill
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch(); //dispatch içinde reducerlara erişilir
  const navigate = useNavigate();

  //POST: create bill
  const onFinish = async (values) => {
    console.log("alanlar:", values);
    try {
      const res = await fetch(process.env.REACT_APP_SERVER_URL+"/api/bills/add-bill", {
        method: "POST",
        body: JSON.stringify({
          ...values,
          //form alanında olmayan alanlar dbye post edilirken:
          subTotal: cart.total,
          tax: ((cart.total * cart.tax) / 100).toFixed(2),
          totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(2),
          cartItems: cart.cartItems, //anlık tıklanan cartItemların tüm bilgisi
        }),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      });
      if (res.status === 200) {
        //işlem başarılıysa
        message.success("Fatura başarıyla oluşturuldu.");
        dispatch(resetCart());//cartItemları temizlemek için
        navigate("/bills");
      }
    } catch (error) {
      message.danger("Bir şeyler yanlış gitti.");
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        title="Fatura Oluştur"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={(_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <OkBtn />
          </>
        )}
      >
        <Form layout={"vertical"} onFinish={onFinish}>
          <Form.Item
            name={"customerName"}
            rules={[
              { required: true, message: "Müşteri adı alanı boş bırakılamaz" },
            ]}
            label="Müşteri Adı"
          >
            <Input placeholder="Müşteri adını giriniz" />
          </Form.Item>

          <Form.Item
            name={"customerPhoneNumber"}
            rules={[
              {
                required: true,
                message: "Telefon numarası alanı boş bırakılamaz",
              },
            ]}
            label="Tel No"
          >
            <Input placeholder="Telefon numarası giriniz" maxLength={11} />
          </Form.Item>

          <Form.Item
            name={"paymentMode"}
            rules={[
              {
                required: true,
                message: "Ödeme yöntemi alanı boş bırakılamaz",
              },
            ]}
            label="Ödeme Yöntemi"
          >
            <Select placeholder={"Ödeme yöntemini seçiniz"}>
              <Select.Option value="Nakit">Nakit</Select.Option>
              <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            </Select>
          </Form.Item>

          <Card className="justify-center w-full bg-[#ECF2FE]">
            <div className="cart-totals mt-auto ">
              <div className="  bg-[#ecf2fe] mt-2">
                <div className="flex justify-between p-2 gap-2">
                  <b className="text-lg">ARA TOPLAM</b>
                  <span className="text-lg">
                    {cart.total > 0 ? cart.total.toFixed(2) : "0.00"}₺
                  </span>
                </div>
                <div className="flex justify-between p-2  border-[#e0e3fe]">
                  <b className="text-lg">KDV %{cart.tax}</b>
                  <span className="text-orange-700 text-lg">
                    {(cart.total * cart.tax) / 100 > 0
                      ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                      : 0}
                    ₺
                  </span>
                </div>
                <div className="flex justify-between gap-2 p-2  border-[#e0e3fe]">
                  <b className="text-[#5675C9] font-[800] text-lg">TOPLAM</b>
                  <span className="text-xl">
                    {cart.total + (cart.total * cart.tax) / 100 > 0
                      ? (cart.total + (cart.total * cart.tax) / 100).toFixed(2)
                      : 0}
                    ₺
                  </span>
                </div>

                <div className="flex justify-between p-2  border-[#e0e3fe] py-3">
                  <Button
                    onClick={() => setOpen()}
                    htmlType="submit"
                    disabled={cart.cartItems.length === 0}
                    className="w-full text-white bg-gradient-to-r from-[#6988ef] via-[#76a1ff] to-[#3c5fd0] font-[800] text-sm rounded-lg hover:text-white hover:bg-gradient-to-br hover:from-[#b9b4e7] hover:to-[#c7d5f3]"
                  >
                    SİPARİŞ OLUŞTUR
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Form>
      </Modal>
    </div>
  );
}
