
import { GoogleGenAI, Type } from "@google/genai";
import { JOB_CATEGORIES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

interface GeneratedJobPost {
  title: string;
  description: string;
  category: string;
}

export const generateJobPost = async (prompt: string): Promise<GeneratedJobPost> => {
  try {
    const validCategories = JOB_CATEGORIES.map(c => c.id);
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `حول هذا الطلب إلى إعلان وظيفة: "${prompt}"`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: {
              type: Type.STRING,
              description: 'عنوان جذاب ومختصر للوظيفة باللغة العربية.'
            },
            description: {
              type: Type.STRING,
              description: 'وصف مفصل للمهمة المطلوبة باللغة العربية، بما في ذلك أي تفاصيل مهمة ذكرها المستخدم.'
            },
            category: {
              type: Type.STRING,
              description: `أفضل فئة للوظيفة من هذه القائمة: ${validCategories.join(', ')}`,
              enum: validCategories
            }
          },
          required: ['title', 'description', 'category']
        },
        systemInstruction: `أنت مساعد خبير في كتابة إعلانات الوظائف للمجتمعات العربية في إسرائيل. قم بتحويل طلب المستخدم غير الرسمي إلى عنوان وظيفة احترافي ووصف مفصل. استنتج أفضل فئة للوظيفة من القائمة المتاحة. يجب أن تكون اللغة عربية واضحة ومناسبة وسهلة الفهم.`
      }
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);

    return parsedJson as GeneratedJobPost;

  } catch (error) {
    console.error("Error generating job post with Gemini:", error);
    throw new Error("فشل في إنشاء إعلان الوظيفة. يرجى المحاولة مرة أخرى.");
  }
};
