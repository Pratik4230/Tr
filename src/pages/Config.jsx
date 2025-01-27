import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Config = () => {
  const RANDOM_DATA = [
    {
      id: "1065634371736175",
      whatsapp_business_account_id: "378243102032704",
      name: "user_attendace_update",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"BODY","text":"Hello {{1}},\\n\\n*{{2}}*\\n\\nThis is a notification that you have successfully *{{3}}*.\\n\\nYour last session duration was *{{4}}*.\\n \\nTotal time spent today: *{{5}}*.\\n\\nIf this was not you, please contact support immediately.\\n\\nThank you,\\n*Technfest*","example":{"body_text":[["Sagar","Good morning","Log in","1 hr  2 mins","1 hr  2 mins"]]}}]',
      component_data:
        '[{"type":"BODY","text":"Hello {{1}},\\n\\n*{{2}}*\\n\\nThis is a notification that you have successfully *{{3}}*.\\n\\nYour last session duration was *{{4}}*.\\n \\nTotal time spent today: *{{5}}*.\\n\\nIf this was not you, please contact support immediately.\\n\\nThank you,\\n*Technfest*","example":{"body_text":[["Sagar","Good morning","Log in","1 hr  2 mins","1 hr  2 mins"]]}}]',
      created_at: "2024-09-16T13:27:25.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "1121428256032836",
      whatsapp_business_account_id: "378243102032704",
      name: "sample_1",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"BODY","text":"Here’s a sample utility WhatsApp message:\\n\\nHi {{1}},\\n\\nFor any assistance, reply to this message or contact us at +91-XXXX-XXXXXX.","example":{"body_text":[["Vishal"]]}}]',
      component_data:
        '[{"type":"BODY","text":"Here’s a sample utility WhatsApp message:\\n\\nHi {{1}},\\n\\nFor any assistance, reply to this message or contact us at +91-XXXX-XXXXXX.","example":{"body_text":[["Vishal"]]}}]',
      created_at: "2025-01-08T06:39:09.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "1126647525760533",
      whatsapp_business_account_id: "378243102032704",
      name: "job_request",
      category: "MARKETING",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/442694931_1126647529093866_8668616899299988439_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=KwWoQiqeHtwQ7kNvgHwM0n0&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIMiwxcJFCA2F-FpGnORFse4_uSPvQmz8-TLQiKzMGY5H&oe=67B96F9E"]}},{"type":"BODY","text":"We are hiring for exciting roles at Technfest IT Solutions!\\nExplore opportunities in:\\n- Web Developer\\n- Backend Developer\\n- Android Developer\\n- Social Media Executive\\n- Telecaller\\n- Sales Executive\\n\\nTap below to start your application now!"},{"type":"BUTTONS","buttons":[{"type":"FLOW","text":"Join Now","flow_id":1812603809498247,"flow_action":"DATA_EXCHANGE"}]}]',
      component_data:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/442694931_1126647529093866_8668616899299988439_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=KwWoQiqeHtwQ7kNvgHwM0n0&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIMiwxcJFCA2F-FpGnORFse4_uSPvQmz8-TLQiKzMGY5H&oe=67B96F9E"]}},{"type":"BODY","text":"We are hiring for exciting roles at Technfest IT Solutions!\\nExplore opportunities in:\\n- Web Developer\\n- Backend Developer\\n- Android Developer\\n- Social Media Executive\\n- Telecaller\\n- Sales Executive\\n\\nTap below to start your application now!"},{"type":"BUTTONS","buttons":[{"type":"FLOW","text":"Join Now","flow_id":1812603809498247,"flow_action":"DATA_EXCHANGE"}]}]',
      created_at: "2025-01-09T16:02:05.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "1671725230222394",
      whatsapp_business_account_id: "378243102032704",
      name: "fb_lead_reply",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/467556889_1671725233555727_1968885457610173110_n.jpg?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=pfJsG9ak_1kQ7kNvgFCuHf_&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIFAMsNZUVRjzQxptvBOsYu1azE9ELNOR22U8Q9_gLL6-&oe=67B9405C"]}},{"type":"BODY","text":"Hi {{1}}, 👋\\n\\nThank you for submitting your details. We’ve received your request and will contact you shortly to assist further.\\n\\n💬 If you need immediate assistance, reply \\"HELP\\" or call us directly.\\n\\nLooking forward to connecting with you!\\n- Team Technfest IT Solution","example":{"body_text":[["Sagar"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call Now For Support","phone_number":"+917700048284"}]}]',
      component_data:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/467556889_1671725233555727_1968885457610173110_n.jpg?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=pfJsG9ak_1kQ7kNvgFCuHf_&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIFAMsNZUVRjzQxptvBOsYu1azE9ELNOR22U8Q9_gLL6-&oe=67B9405C"]}},{"type":"BODY","text":"Hi {{1}}, 👋\\n\\nThank you for submitting your details. We’ve received your request and will contact you shortly to assist further.\\n\\n💬 If you need immediate assistance, reply \\"HELP\\" or call us directly.\\n\\nLooking forward to connecting with you!\\n- Team Technfest IT Solution","example":{"body_text":[["Sagar"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call Now For Support","phone_number":"+917700048284"}]}]',
      created_at: "2024-12-08T06:43:02.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "1764366027662661",
      whatsapp_business_account_id: "378243102032704",
      name: "thank_you_for_call",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/463171787_1764366030995994_6123969779809729217_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=66FF0RcRILEQ7kNvgFF0VVJ&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIArjEM4dPfAvNqR64mbsjGqHIGfcKBIP9vGl5b9wRACH&oe=67B95629"]}},{"type":"BODY","text":"Hi {{1}}, thank you for reaching out to us. This is a quick follow-up regarding our communication. If you have any pending queries or need further assistance, feel free to reply to this message.\\n\\n🌟 Manage your WhatsApp communication efficiently with our panel.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call Back","phone_number":"+918857808284"}]}]',
      component_data:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/463171787_1764366030995994_6123969779809729217_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=66FF0RcRILEQ7kNvgFF0VVJ&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIArjEM4dPfAvNqR64mbsjGqHIGfcKBIP9vGl5b9wRACH&oe=67B95629"]}},{"type":"BODY","text":"Hi {{1}}, thank you for reaching out to us. This is a quick follow-up regarding our communication. If you have any pending queries or need further assistance, feel free to reply to this message.\\n\\n🌟 Manage your WhatsApp communication efficiently with our panel.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call Back","phone_number":"+918857808284"}]}]',
      created_at: "2024-11-25T12:07:16.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "3780098488922415",
      whatsapp_business_account_id: "378243102032704",
      name: "thank_you_for_call_unanswered",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/458403111_3780098495589081_1599502339249412938_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=097fx_I9wqgQ7kNvgFjMUKm&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIIF7VWmNazRMy37buhNt8ydCPq-60VKPaEVexYk_2qzH&oe=67B96750"]}},{"type":"BODY","text":"Hi {{1}}, we tried reaching you but couldn’t connect over the call. If you have any questions or need assistance, feel free to reply to this message.\\n\\n🌟 Manage your WhatsApp communication efficiently with our panel.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call Back","phone_number":"+918857808284"}]}]',
      component_data:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/458403111_3780098495589081_1599502339249412938_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=097fx_I9wqgQ7kNvgFjMUKm&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIIF7VWmNazRMy37buhNt8ydCPq-60VKPaEVexYk_2qzH&oe=67B96750"]}},{"type":"BODY","text":"Hi {{1}}, we tried reaching you but couldn’t connect over the call. If you have any questions or need assistance, feel free to reply to this message.\\n\\n🌟 Manage your WhatsApp communication efficiently with our panel.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call Back","phone_number":"+918857808284"}]}]',
      created_at: "2024-11-25T13:08:51.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "411491845375013",
      whatsapp_business_account_id: "378243102032704",
      name: "fb_lead_reply_image",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/459594214_411491852041679_220405083829706730_n.jpg?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=b1vmKn0eeVQQ7kNvgHEAi4i&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaICZ49_mtJIFBZRr2XMVku3FsPcobyYin7AroSm3Bb4B6&oe=67B9509D"]}},{"type":"BODY","text":"Hi {{1}}, 👋\\n\\n*Thank you for submitting your details! 🌟 We’ve successfully received your request regarding your inquiry.*\\n\\n📄 Please take a moment to *review the attached information.*\\n\\nOur executive will connect with you shortly to assist you further.\\n\\n💬 Need immediate assistance? Simply reply \\"START\\", and we’ll be there to help!\\n\\nWe’re excited to support you on this journey! 🚀\\n\\n- *Technfest IT Solution*","example":{"body_text":[["Sagar"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call Now","phone_number":"+917700048284"}]}]',
      component_data:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/459594214_411491852041679_220405083829706730_n.jpg?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=b1vmKn0eeVQQ7kNvgHEAi4i&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaICZ49_mtJIFBZRr2XMVku3FsPcobyYin7AroSm3Bb4B6&oe=67B9509D"]}},{"type":"BODY","text":"Hi {{1}}, 👋\\n\\n*Thank you for submitting your details! 🌟 We’ve successfully received your request regarding your inquiry.*\\n\\n📄 Please take a moment to *review the attached information.*\\n\\nOur executive will connect with you shortly to assist you further.\\n\\n💬 Need immediate assistance? Simply reply \\"START\\", and we’ll be there to help!\\n\\nWe’re excited to support you on this journey! 🚀\\n\\n- *Technfest IT Solution*","example":{"body_text":[["Sagar"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call Now","phone_number":"+917700048284"}]}]',
      created_at: "2024-12-08T07:03:46.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "539610962560134",
      whatsapp_business_account_id: "378243102032704",
      name: "user_password",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"BODY","text":"Hello {{1}},\\nYour account has been successfully created. Below are your login credentials:\\n\\nLogin URL: *https://waba2.mpocket.in*\\n\\nUsername: *{{2}}*\\nPassword: *{{3}}*\\nPlease keep your credentials secure and do not share them with anyone. If you face any issues, feel free to contact our support team.\\n\\nThank you,\\nTechnfest","example":{"body_text":[["Sagar","sagar@sagar.com","123456"]]}}]',
      component_data:
        '[{"type":"BODY","text":"Hello {{1}},\\nYour account has been successfully created. Below are your login credentials:\\n\\nLogin URL: *https://waba2.mpocket.in*\\n\\nUsername: *{{2}}*\\nPassword: *{{3}}*\\nPlease keep your credentials secure and do not share them with anyone. If you face any issues, feel free to contact our support team.\\n\\nThank you,\\nTechnfest","example":{"body_text":[["Sagar","sagar@sagar.com","123456"]]}}]',
      created_at: "2024-12-04T09:43:58.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "562429133161864",
      whatsapp_business_account_id: "378243102032704",
      name: "thank_you_for_call_incoming_answered",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/463731841_562429136495197_6426855360308536160_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=uGUxgP43ZyAQ7kNvgHbC140&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIAyNyCwK_SVYRqJqPPOWveyyrBgRZPQ3facRRuPLkgl-&oe=67B9406B"]}},{"type":"BODY","text":"Hi {{1}}, thank you for reaching out to us via call! It was great connecting with you. If you have any further questions or need assistance, feel free to reply to this message.\\n\\n🌟 Simplify your communication with our WhatsApp Panel, designed to make your interactions seamless and efficient.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call on Support","phone_number":"+917700048284"}]}]',
      component_data:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/463731841_562429136495197_6426855360308536160_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=uGUxgP43ZyAQ7kNvgHbC140&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIAyNyCwK_SVYRqJqPPOWveyyrBgRZPQ3facRRuPLkgl-&oe=67B9406B"]}},{"type":"BODY","text":"Hi {{1}}, thank you for reaching out to us via call! It was great connecting with you. If you have any further questions or need assistance, feel free to reply to this message.\\n\\n🌟 Simplify your communication with our WhatsApp Panel, designed to make your interactions seamless and efficient.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call on Support","phone_number":"+917700048284"}]}]',
      created_at: "2024-11-25T13:18:13.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "581975220901507",
      whatsapp_business_account_id: "378243102032704",
      name: "thank_you_for_call_answered",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/328798428_581975227568173_3937228240267479964_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=D9gP6clLbdEQ7kNvgGHw3X1&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIFMo-JDHtfcKDVBgK1yU-3cdeyrODjUkDM21i-BmNCno&oe=67B960BC"]}},{"type":"BODY","text":"Hi {{1}}, thank you for speaking with us over the call! We value your time and are here to assist you with any further queries.\\n\\n🌟 For seamless communication, explore our WhatsApp Panel to manage your interactions efficiently.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call for Support","phone_number":"+917700048284"}]}]',
      component_data:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/328798428_581975227568173_3937228240267479964_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=D9gP6clLbdEQ7kNvgGHw3X1&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIFMo-JDHtfcKDVBgK1yU-3cdeyrODjUkDM21i-BmNCno&oe=67B960BC"]}},{"type":"BODY","text":"Hi {{1}}, thank you for speaking with us over the call! We value your time and are here to assist you with any further queries.\\n\\n🌟 For seamless communication, explore our WhatsApp Panel to manage your interactions efficiently.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}},{"type":"BUTTONS","buttons":[{"type":"PHONE_NUMBER","text":"Call for Support","phone_number":"+917700048284"}]}]',
      created_at: "2024-11-25T13:12:00.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "7849459758499061",
      whatsapp_business_account_id: "378243102032704",
      name: "1_reinitiate",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"BODY","text":"Hello {{1}}, we have an update regarding your query. Our team will connect with you as soon as you respond. Please feel free to reach out at your convenience. We\'re here to assist you!\\n\\nBest regards,\\n*Technfest*","example":{"body_text":[["Sagar"]]}}]',
      component_data:
        '[{"type":"BODY","text":"Hello {{1}}, we have an update regarding your query. Our team will connect with you as soon as you respond. Please feel free to reach out at your convenience. We\'re here to assist you!\\n\\nBest regards,\\n*Technfest*","example":{"body_text":[["Sagar"]]}}]',
      created_at: "2024-10-02T08:26:38.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "799227742361975",
      whatsapp_business_account_id: "378243102032704",
      name: "hello_world",
      category: "UTILITY",
      language: "en_US",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"TEXT","text":"Hello World"},{"type":"BODY","text":"Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us."},{"type":"FOOTER","text":"WhatsApp Business Platform sample message"}]',
      component_data:
        '[{"type":"HEADER","format":"TEXT","text":"Hello World"},{"type":"BODY","text":"Welcome and congratulations!! This message demonstrates your ability to send a WhatsApp message notification from the Cloud API, hosted by Meta. Thank you for taking the time to test with us."},{"type":"FOOTER","text":"WhatsApp Business Platform sample message"}]',
      created_at: "2024-07-15T11:02:00.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
    {
      id: "841584631242462",
      whatsapp_business_account_id: "378243102032704",
      name: "after_office_hours_call",
      category: "UTILITY",
      language: "en",
      quality_score: null,
      status: "APPROVED",
      components:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/458447493_841584634575795_2599226193726831289_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=NP5v33afFocQ7kNvgEV3iZP&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIP7wA57Cs8TFkuLAuRM-EwqqufzcaiQOenpILMF97z2d&oe=67B955B4"]}},{"type":"BODY","text":"Hi {{1}}, thank you for reaching out to us! Our office hours are from 9:00 AM to 6:00 PM. We noticed your call and will get back to you as soon as possible during working hours.\\n\\n🌟 Meanwhile, you can explore our WhatsApp Panel to manage your communication needs effectively.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}}]',
      component_data:
        '[{"type":"HEADER","format":"IMAGE","example":{"header_handle":["https://scontent.whatsapp.net/v/t61.29466-34/458447493_841584634575795_2599226193726831289_n.png?ccb=1-7&_nc_sid=8b1bef&_nc_ohc=NP5v33afFocQ7kNvgEV3iZP&_nc_zt=3&_nc_ht=scontent.whatsapp.net&edm=AH51TzQEAAAA&_nc_gid=AyR-GU94_Xpquv5xinzF3aI&oh=01_Q5AaIP7wA57Cs8TFkuLAuRM-EwqqufzcaiQOenpILMF97z2d&oe=67B955B4"]}},{"type":"BODY","text":"Hi {{1}}, thank you for reaching out to us! Our office hours are from 9:00 AM to 6:00 PM. We noticed your call and will get back to you as soon as possible during working hours.\\n\\n🌟 Meanwhile, you can explore our WhatsApp Panel to manage your communication needs effectively.\\n\\nVisit: {{2}} for more details.","example":{"body_text":[["Sagar","www.technfest.com"]]}}]',
      created_at: "2024-11-25T13:21:15.000Z",
      updated_at: "2025-01-23T07:06:47.000Z",
    },
  ];

  const [template, setTemplate] = useState("hello_world");

  const [dynamicArrayOfValues, setDynamicArrayOfValues] = useState([]);
  const [dynamicSuspiciosText, setDynamicSuspiciousText] = useState("");
  const [suspiciousText2, setSuspiciousText2] = useState("");

  const TRASH = RANDOM_DATA.filter((item) => item?.name === template);

  const compo = JSON.parse(TRASH[0]?.components);

  // console.log("compodata", compo);
  let arrayOfExamples = [];
  let arrayOfValues = [];

  let ingnoreArray = [];

  let suspiciousText;
  if (compo[0]?.example?.body_text) {
    arrayOfExamples = compo[0]?.example?.body_text[0];
  }
  if (compo[1]?.example?.body_text) {
    arrayOfExamples = compo[1]?.example?.body_text[0];
  }

  ingnoreArray.length = arrayOfExamples.length;
  console.log("INGNORE ARRAY ", ingnoreArray);

  // for (let i = 0; i < arrayOfExamples.length; i++) {
  //   if (arrayOfExamples[i]) {
  //     arrayOfValues.push(arrayOfExamples[i]?.toString());
  //     setDynamicArrayOfValues((prevArray) => [
  //       ...prevArray,
  //       arrayOfExamples[i]?.toString(),
  //     ]);
  //   }
  // }

  console.log("arrayOfValues", arrayOfValues);
  console.log("DYNAMIC ARRAY OF VALUES", dynamicArrayOfValues);

  // useEffect(() => {
  if (compo[1]?.type === "BODY") {
    suspiciousText = compo[1]?.text;
    // setSuspiciousText(compo[1]?.text);
  }
  if (compo?.length == 1 && compo[0]?.type == "BODY") {
    suspiciousText = compo[0]?.text;
    // setSuspiciousText(compo[0]?.text);
  }

  for (let i = 0; i < arrayOfExamples.length; i++) {
    if (arrayOfExamples[i]) {
      arrayOfValues.push(arrayOfExamples[i]?.toString());
      // setDynamicArrayOfValues((prevArray) => [
      //   ...prevArray,
      //   arrayOfExamples[i]?.toString(),
      // ]);
    }
  }
  // }, [template]);

  const replacePlaceholdersWithArray = (template, values) => {
    return template.replace(
      /{{(\d+)}}/g,
      (_, key) => values[key - 1] || `{{${key}}}`
    );
  };

  const ORDER = replacePlaceholdersWithArray(
    suspiciousText,
    dynamicArrayOfValues.length > 0 ? dynamicArrayOfValues : arrayOfValues
  );

  useEffect(() => {
    const selectedTemplate = RANDOM_DATA.find((item) => item.name === template);
    if (!selectedTemplate) return;

    const components = JSON.parse(selectedTemplate.components);
    const bodyComponent = components.find((c) => c.type === "BODY");

    if (bodyComponent?.example?.body_text?.[0]) {
      setDynamicArrayOfValues([...bodyComponent.example.body_text[0]]);
    } else {
      setDynamicArrayOfValues([]);
    }

    if (bodyComponent?.text) {
      setSuspiciousText2(bodyComponent.text);
    }
  }, [template]); // Resets values when template changes

  // const handleInputChange = (inputValue, index) => {
  //   console.log("hanling", inputValue, "index", index);

  //   arrayOfValues[index] = inputValue;
  //   // const updatedArray = [...dynamicArrayOfValues];
  //   ingnoreArray = [...dynamicArrayOfValues];

  //   // Update the specific index with the new value
  //   // updatedArray[index] = inputValue;
  //   ingnoreArray[index] = inputValue;

  //   // Set the updated array to state
  //   // setDynamicArrayOfValues(updatedArray);
  //   setDynamicArrayOfValues(ingnoreArray);

  //   // ingnoreArray[index] = inputValue;
  //   // setDynamicArrayOfValues(ingnoreArray);
  // };

  const handleInputChange = (inputValue, index) => {
    console.log("Handling", inputValue, "at index", index);

    arrayOfValues[index] = inputValue;

    // Create a new array by copying the old one and replacing the specific index
    const updatedArray = [...dynamicArrayOfValues];

    // Update the specific index with the new value
    updatedArray[index] = inputValue;

    // Set the updated array to the state
    setDynamicArrayOfValues(updatedArray);
  };

  console.log("after replacement", ORDER);

  return (
    <div>
      <p>config</p>

      <main>
        <p></p>
        <h1>Campaign Create</h1>
        <p>select phone no.</p>
        <select>
          <option value="8888888888">888888888</option>
        </select>

        <div className="flex justify-between">
          <section className="w-[48%]">
            <h1>Campaign Create</h1>
            {/* // SELECT DROPDOWN */}
            <div>
              <select
                id="template"
                value={template}
                onChange={(e) => {
                  setTemplate(e.target.value);
                  setDynamicArrayOfValues([]);
                }}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="" disabled>
                  select template
                </option>
                {RANDOM_DATA.map((item) => (
                  <option key={item?._id} value={item?.name}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Values */}

            {/* Choose Image */}
            <div>
              <p className="font-bold ">
                Header Image URL: Upload Header Image:
              </p>

              <input
                type="file"
                className="border border-gray-300"
                accept="image/*"
              />
            </div>

            {/* DYNAMIC VALUES */}
            <div>
              {arrayOfValues?.length > 0 &&
                arrayOfValues?.map((value, index) => (
                  <div>
                    <strong>Value for {index + 1} : </strong>{" "}
                    {/* DYNAMIC VALUE INPUT FIELD */}
                    <input
                      type="text"
                      className="border border-gray-300"
                      placeholder={value}
                      // value=""
                      onChange={(e) => {
                        handleInputChange(e.target.value, index);
                      }}
                    />
                  </div>
                ))}
            </div>
          </section>

          <section className="w-[48%] border-2 border-blue-300 p-2">
            <h1>Template Preview</h1>

            {/* Header ONly */}
            <div>
              {compo[0]?.type === "HEADER" && compo[0]?.format === "TEXT" && (
                <p className="text-2xl font-bold ">{compo[0]?.text}</p>
              )}

              {compo[0]?.type === "HEADER" && compo[0]?.format === "IMAGE" && (
                <div className="w-full flex justify-center">
                  <img
                    src={compo[0]?.example?.header_handle[0]}
                    alt="header"
                    className="h-60 "
                  />
                </div>
              )}
            </div>

            {/* BOdy Only */}
            <div className="pl-5">
              {compo[1]?.type === "BODY" && (
                <section>
                  <div>
                    {ORDER.split(`\n`).map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </section>
              )}

              <div>
                {compo?.length == 1 && compo[0]?.type == "BODY" && (
                  <div>
                    {ORDER.split(`\n`).map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Only  */}
            <div>
              {compo[2]?.type === "FOOTER" && (
                <p className="mt-3 ">{compo[2]?.text}</p>
              )}
            </div>

            {/* Buttons Only */}
            <div className="flex justify-center">
              {compo[2]?.type === "BUTTONS" && (
                <Button className="mt-3 ">{compo[2]?.buttons[0]?.text}</Button>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Config;
