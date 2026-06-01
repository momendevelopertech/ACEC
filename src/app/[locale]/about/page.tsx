import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhySection } from "@/components/sections/WhySection";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === "ar" ? "عن المكتب | ACEC" : "About Us | ACEC",
    description:
      locale === "ar"
        ? "الميثاق العربي للاستشارات الهندسية وهندسة السلامة — تعرف على مكتبنا وفريقنا"
        : "Arabian Covenant Engineering Consultants — learn about our office and team",
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const isArabic = locale === "ar";

  const storyEn = "ACEC is a Saudi engineering consultancy firm established in 2006, headquartered in Riyadh, led by its founder and General Manager, Engineer Majed Al-Thuaiyb. It is one of the select few offices in Saudi Arabia accredited by the Civil Defense to operate across all cities of the Kingdom, specializing in fire protection and safety engineering — operating under the Saudi Building Code (SBC). Built to support the nation's vision of fostering large-scale projects, community development, and human advancement, ACEC operates with strong professional standards and high ethical values, housing a team of highly educated and experienced professionals dedicated to understanding client needs and delivering sustainable, cost-effective solutions on time and within scope.";

  const storyAr = "الميثاق العربي للاستشارات الهندسية (ACEC) هو مكتب استشاري سعودي تأسس عام 2006، المكتب الرئيسي في الرياض والمالك والمدير العام هو المهندس ماجد الذييب. وهو أحد المكاتب القليلة على مستوى المملكة العربية السعودية المعتمدة لدى إدارة الدفاع المدني للعمل بجميع مدن المملكة العربية السعودية كاستشاري بمجال الحماية ومكافحة الحريق. تم إنشاء المكتب بما يحقق أهداف الوطن في إنجاح المشروعات الكبرى وتطوير المجتمع وبناء الحضارة الإنسانية طبقاً للكود السعودي (SBC). يضع ACEC معايير مهنية قوية وقيم أخلاقية عالية، ويفخر بوجود فريق محترف ومتماسك ذو تعليم عالٍ وذو خبرة يعمل مع العملاء لتحقيق وفهم متطلباتهم وتزويدهم بأفضل الخدمات المهنية والحلول الاقتصادية المستدامة ضمن الأطر الزمنية والمواعيد النهائية المطلوبة.";

  const founderAr = `لكل مهنة أسرارها، وأيضاً لكل مهنة تقاليدها وأعرافها.. وقبل أن تنخرط في مجال مهنتك تكون الأفكار حالمة والمعالم وردية، وفي بداية الحياة العملية تتضح المعالم شيئاً فشيئاً، وتتمحور الأفكار رويداً رويداً، وكلما زادت الخطوات على الطريق كلما أفصحت لك المهنة عن بعض أسرارها وألزمتك الكثير من تقاليدها وأعرافها.

ولأن مهنتنا دون تحيز مهنة محورية في تاريخ البشرية — خُلق الإنسان مطالباً بأن يعمر الأرض — فإن أسرار المهنة وتقاليدها وأعرافها عتيقة راسخة.. ثم أن تختار بعد ذلك مجال عمل الاستشاري بدروبه ومسؤولياته.. هنا تبدأ مرحلة البحث عن المتاعب وإن كانت بحق مفتاح التميز.

في مجال التصاميم: أنت مطالب بأن توازن بين شطحات أفكارك ومتطلبات المالك وإمكانياته واشتراطات الجهة المنظمة.. مرتدياً ثوب المعاصرة ومستلهماً روح التاريخ، وأشياء أخرى.. كأنواع الخامات وأسعار المواد وطرق التنفيذ.

وفي مجال الإشراف: أنت مطالب بأن تستدعي ضمير القاضي.. وأن تفصل في حزم بين طلبات الجهة المالكة واجتهادات المقاول بل ومشاكل التصميم.. متسلحاً بنصوص العقود التي قد يشوبها الغموض أو القصور أو حتى الجموح، مراعياً الأصول الفنية ومستوعباً آليات السوق وغيرها.

ومجالات إدارة المشاريع، الدعم الفني، التدريب، التقييم، التحكيم، ومجالات أخرى للعمل.`;

  const founderEn = "Every profession has its secrets, traditions, and challenges. As you embark on your professional journey, you begin with dreams and ideals, but with experience, you uncover the profound depth of your craft. In our field, being a consultant means balancing visionary ideas with client requirements, regulatory standards, and material realities. This role demands both creativity and precision — adapting to modern technologies while honoring historical influences. Whether in design or supervision, our work demands integrity, clarity, and attention to detail, ensuring that every project achieves excellence. At ACEC, we commit to elevating the art and science of engineering, creating impactful projects, and contributing to the progress of our nation.";

  const visionEn = "To lead the engineering consultancy industry with unmatched expertise in safety engineering, fire prevention, and project management — setting new benchmarks in architectural design, collaborating with leading firms locally and globally, and delivering expert, unbiased advice that protects lives and assets.";
  const visionAr = "الريادة في مجال الاستشارات الهندسية وهندسة السلامة والوقاية من الحريق وإدارة المشاريع وأن يكون رائداً في مجال التصميمات الهندسية المختلفة وأن يتفاعل مع كبرى المكاتب الاستشارية وشركات المقاولات داخل وخارج المملكة العربية السعودية، حيث أنه لا يمكن حماية الحياة والأصول بشكل فعال إلا إذا تم تقديم المشورة ذات الخبرة بطريقة غير متحيزة ومستقلة.";

  const missionEn = "To advance the art and science of engineering while preserving the environment by leveraging cutting-edge technology and tools. Through a team of qualified and experienced engineers, we design and supervise projects that uphold the highest standards of safety, sustainability, and innovation.";
  const missionAr = "الرقي بفن وعلم الهندسة مع المحافظة على البيئة من خلال استخدام أحدث الأجهزة والأدوات الحديثة بتوفير طاقم فني من المهندسين المؤهلين ذوي الخبرة العلمية والعملية المدعومة باستخدام أحدث ما توصلت إليه التكنولوجيا، كما يقوم المكتب بالتصميم والإشراف على المشاريع بمجال الاستشارات الهندسية واستشارات أنظمة الأمن والسلامة.";

  const goals = isArabic ? [
    "المساهمة بالنمو والنهضة العمرانية",
    "المساهمة في استخدام الطاقة المتجددة للتنمية المستدامة والحفاظ على البيئة",
    "أن نكون أفضل جاذب للكوادر البشرية المميزة للتنمية في المنطقة",
    "أن نكون الخيار الأفضل بمجال عملنا",
    "بناء كفاءات هندسية مميزة تساهم بفاعلية في التنمية الاقتصادية في المملكة",
    "إيجاد البيئة المحفزة للتطوير والإبداع والابتكار بما يخدم احتياجات المجتمع",
  ] : [
    "Contribute to urban growth and development",
    "Promote renewable energy for sustainable development and environmental preservation",
    "Be the best attractor of distinguished human talent in the region",
    "Be the top choice in our field of work",
    "Build exceptional engineering competencies that effectively contribute to economic development in the Kingdom",
    "Create an inspiring environment for development, creativity, and innovation that serves community needs",
  ];

  const visionPoints = isArabic ? [
    "يتمتع ACEC بالخبرة والموظفين المعتمدين مهنياً",
    "يوفر ACEC للعملاء خدمات احترافية سليمة واستراتيجية نشر مع المراعاة الكاملة والوعي باللوائح والثقافة المحلية",
    "يستثمر ACEC في علاقات العملاء الحالية ويستكشف إمكانيات التوسع في الأسواق الجديدة والناشئة لضمان الاستدامة والنمو",
    "يقدم ACEC للموظفين بيئة عمل ملهمة وفرصة لرعاية وتطوير مهاراتهم الفنية والشخصية",
  ] : [
    "ACEC has the expertise and professionally certified staff",
    "ACEC provides clients with sound professional services and deployment strategy with full consideration and awareness of local regulations and culture",
    "ACEC invests in existing client relationships and explores expansion possibilities in new and emerging markets to ensure sustainability and growth",
    "ACEC provides employees with an inspiring work environment and an opportunity to nurture and develop their technical and personal skills",
  ];

  return (
    <>
      <Navbar />
      <main className="pt-[80px]">
        {/* Page Header */}
        <div className="pt-20 pb-8 px-6 bg-[var(--color-olive-deep)] border-b border-[rgba(255,255,255,0.06)] text-center">
          <div className="container-custom">
            <div className="section-label justify-center mb-4" style={{ color: "rgba(198,166,107,0.8)" }}>ACEC</div>
            <h1 className="text-[clamp(2.5rem,5vw,4rem)] font-[300] text-white tracking-[-0.02em]">
              {isArabic ? "عن " : "About "}
              <strong className="text-[#C6A66B]">{isArabic ? "مكتبنا" : "Us"}</strong>
            </h1>
          </div>
        </div>

        {/* Our Story Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="section-label mb-4">{isArabic ? "قصتنا" : "Our Story"}</div>
              <h2 className="section-heading" style={{ marginBottom: "1.5rem" }}>
                {isArabic ? "منذ 2006 في خدمة الوطن" : "Serving the Nation Since 2006"}
              </h2>
              <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-8" dir={isArabic ? "rtl" : "ltr"}>
                <p className="text-[#888888] leading-[1.9] text-[0.95rem] whitespace-pre-line">
                  {isArabic ? storyAr : storyEn}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder's Message */}
        <section className="section-padding" style={{ background: "#F5F5F5", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="section-label mb-4">{isArabic ? "كلمة الرئيس العام" : "Founder's Message"}</div>
              <h2 className="section-heading" style={{ marginBottom: "0.75rem" }}>
                {isArabic ? "المهندس ماجد الذييب" : "Eng. Majed Al-Thuaiyb"}
              </h2>
              <p className="text-[#888888] text-sm mb-8">
                {isArabic ? "المالك والمدير العام" : "Founder & General Manager"}
              </p>
              <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-8" dir={isArabic ? "rtl" : "ltr"}>
                <p className="text-[#888888] leading-[1.9] text-[0.9rem] whitespace-pre-line">
                  {isArabic ? founderAr : founderEn}
                </p>
              </div>
              <div className="mt-8 text-center">
                <p className="text-[#C6A66B] font-semibold text-lg">
                  {isArabic ? "— المهندس ماجد الذييب، المؤسس والمدير العام" : "— Engineer Majed Al-Thuaiyb, Founder & General Manager"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="section-label mb-4">{isArabic ? "رؤيتنا" : "Our Vision"}</div>
              <h2 className="section-heading" style={{ marginBottom: "1.5rem" }}>
                {isArabic ? "الريادة في الاستشارات الهندسية" : "Leadership in Engineering Consultancy"}
              </h2>
              <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-8 mb-8" dir={isArabic ? "rtl" : "ltr"}>
                <p className="text-[#888888] leading-[1.9] text-[0.95rem]">
                  {isArabic ? visionAr : visionEn}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visionPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white border border-[rgba(0,0,0,0.06)] rounded-xl p-5">
                    <div className="w-6 h-6 rounded-full bg-[rgba(198,166,107,0.12)] border border-[rgba(198,166,107,0.25)] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#C6A66B] text-xs font-bold">{i + 1}</span>
                    </div>
                    <p className="text-[#888888] text-[0.9rem] leading-[1.6]">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding" style={{ background: "#F5F5F5", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="section-label mb-4">{isArabic ? "رسالتنا" : "Our Mission"}</div>
              <h2 className="section-heading" style={{ marginBottom: "1.5rem" }}>
                {isArabic ? "الارتقاء بفن وعلم الهندسة" : "Advancing the Art of Engineering"}
              </h2>
              <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-8" dir={isArabic ? "rtl" : "ltr"}>
                <p className="text-[#888888] leading-[1.9] text-[0.95rem]">
                  {isArabic ? missionAr : missionEn}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Goals */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="section-label mb-4">{isArabic ? "أهدافنا" : "Our Goals"}</div>
              <h2 className="section-heading" style={{ marginBottom: "1.5rem" }}>
                {isArabic ? "6 أهداف استراتيجية" : "6 Strategic Goals"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map((goal, i) => (
                  <div key={i} className="flex items-start gap-4 bg-white border border-[rgba(0,0,0,0.06)] rounded-2xl p-6">
                    <div className="w-10 h-10 rounded-full bg-[rgba(198,166,107,0.1)] border border-[rgba(198,166,107,0.2)] flex items-center justify-center shrink-0">
                      <span className="text-[#C6A66B] font-bold">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className="text-[#1A1A1A] text-[0.95rem] leading-[1.7] pt-1.5">{goal}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Headquarters & Accreditations */}
        <section className="section-padding" style={{ background: "#F5F5F5", borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Headquarters */}
                <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-8">
                  <div className="section-label mb-4">{isArabic ? "المقر الرئيسي" : "Headquarters"}</div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">📍</span>
                      <div>
                        <p className="text-[#1A1A1A] font-semibold mb-1">{isArabic ? "العنوان" : "Address"}</p>
                        <p className="text-[#888888] text-[0.9rem]" dir={isArabic ? "rtl" : "ltr"}>
                          {isArabic
                            ? "الرياض – حي الزهراء – شارع عمر بن عبد العزيز"
                            : "Omar Bin Abdulaziz Street, Al Zahraa District, Riyadh, Saudi Arabia"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">📞</span>
                      <div>
                        <p className="text-[#1A1A1A] font-semibold mb-1">{isArabic ? "الهاتف" : "Phone"}</p>
                        <p className="text-[#888888] text-[0.9rem]">+966 500 037 049</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">✉️</span>
                      <div>
                        <p className="text-[#1A1A1A] font-semibold mb-1">Email</p>
                        <p className="text-[#888888] text-[0.9rem]">info@ac-ec.com.sa</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accreditations */}
                <div className="bg-white border border-[rgba(0,0,0,0.08)] rounded-2xl p-8">
                  <div className="section-label mb-4">{isArabic ? "الاعتمادات" : "Accreditations"}</div>
                  <div className="space-y-6">
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">🛡️</span>
                      <div>
                        <p className="text-[#1A1A1A] font-semibold mb-1">
                          {isArabic ? "الدفاع المدني" : "Civil Defense Authority"}
                        </p>
                        <p className="text-[#888888] text-[0.9rem]">
                          {isArabic
                            ? "معتمد للعمل في جميع مدن المملكة العربية السعودية في مجال الحماية ومكافحة الحريق"
                            : "Accredited to operate across all KSA cities in fire protection and safety"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-xl shrink-0">🏭</span>
                      <div>
                        <p className="text-[#1A1A1A] font-semibold mb-1">MODON</p>
                        <p className="text-[#888888] text-[0.9rem]">
                          {isArabic
                            ? "الهيئة السعودية للمدن الصناعية ومناطق التقنية"
                            : "Saudi Authority for Industrial Cities & Technology Zones"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AboutSection />
        <WhySection />
      </main>
      <Footer />
    </>
  );
}
