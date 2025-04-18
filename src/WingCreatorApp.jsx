import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";

export default function WingCreatorApp() {
  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("");
  const [style, setStyle] = useState("");
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [selectedIdea, setSelectedIdea] = useState("");
  const [script, setScript] = useState("");

  const ideas = [
    "Khách đòi đổi iPhone vì... chụp rõ mụn quá",
    "Vợ giấu mua Samsung, chồng phát hiện trong livestream",
    "Khách mua phụ kiện 59k, đòi bảo hành 5 năm",
    "iPhone 13 Pro Max đẹp như người yêu cũ – nhưng pin trâu hơn"
  ];

  const generateScript = (idea) => {
    const base = `Bối cảnh: Shop Wing Mobile – Khách bước vào

3s đầu: "Anh ơi, con này chụp rõ mụn quá, em trả lại được không?"
Giữa video: Nhân viên bất ngờ, hỏi lại: "Em dùng để làm gì?"
Twist cuối: Nhân viên: "Vậy em mua Samsung cho da mịn nhé!"`;

    setScript(`🎬 Ý tưởng: ${idea}\n\n${base}`);
    setStep(4);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl mx-auto">
      {step === 1 && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">1️⃣ Giới thiệu về bạn</h2>
            <Input placeholder="Tên thương hiệu (VD: Wing Mobile)" value={brand} onChange={(e) => setBrand(e.target.value)} />
            <Input placeholder="Phong cách nội dung (VD: Hài hước, twist, bán hàng)" value={style} onChange={(e) => setStyle(e.target.value)} />
            <Input placeholder="Sản phẩm chính (VD: iPhone cũ, phụ kiện)" value={product} onChange={(e) => setProduct(e.target.value)} />
            <Input placeholder="Khách hàng mục tiêu (VD: học sinh, mẹ bỉm)" value={audience} onChange={(e) => setAudience(e.target.value)} />
            <Button onClick={() => setStep(2)}>Tiếp tục ➡️</Button>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">2️⃣ Chọn ý tưởng</h2>
            {ideas.map((idea, idx) => (
              <Button
                key={idx}
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  setSelectedIdea(idea);
                  generateScript(idea);
                }}
              >
                {idea}
              </Button>
            ))}
            <Button variant="ghost" onClick={() => setStep(1)}>⬅️ Quay lại</Button>
          </CardContent>
        </Card>
      )}

      {step === 4 && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <h2 className="text-xl font-semibold">3️⃣ Kịch bản hoàn chỉnh</h2>
            <Textarea rows={10} value={script} readOnly />
            <Button variant="ghost" onClick={() => setStep(2)}>🔁 Chọn ý tưởng khác</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
