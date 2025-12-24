import json
import pandas as pd

INPUT_JSON = "members_with_otp.json"
OUTPUT_EXCEL = "members_with_otp.xlsx"


# Load JSON
with open(INPUT_JSON, "r", encoding="utf-8") as f:
    members = json.load(f)



df = pd.DataFrame(members)


COLUMN_ORDER = {
    "sl_no": "SL NO",
    "name": "NAME",
    "address": "ADDRESS",
    "family_members": "FAMILY MEMBERS",
    "mobile_no": "MOBILE NO",
    "occupation": "OCCUPATION",
    "blood_group": "BLOOD GROUP",
    "native_place": "NATIVE PLACE",
    "email": "EMAIL",
    "current_status": "CURRENT STATUS",
    "otp_password": "OTP PASSWORD"
}


df = df[[col for col in COLUMN_ORDER if col in df.columns]]

df = df.rename(columns=COLUMN_ORDER)

# Export to Excel
df.to_excel(OUTPUT_EXCEL, index=False)

print(f"✅ Excel file created successfully → {OUTPUT_EXCEL}")
