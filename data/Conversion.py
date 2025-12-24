import pandas as pd
import json

# Read Excel (skip title rows)
df = pd.read_excel(
    "VASAI EAST KERALA SAMAJAM MEMBERSHIP.xls",
    header=2
)

# Clean column names
df.columns = (
    df.columns
    .astype(str)
    .str.replace("\n", " ")
    .str.strip()
    .str.upper()
)

df = df.fillna("")

records = []
current = None

for _, row in df.iterrows():
    sl_no = str(row["SL NO"]).strip()

    # New member starts
    if sl_no != "":
        if current:
            current["address"] = ", ".join(current["address"])
            records.append(current)

        current = {
            "sl_no": int(float(sl_no)),
            "name": row["NAME OF THE MEMBER"].strip(),
            "address": [],
            "family_members": row.get("FAMILY MEMBERS", ""),
            "mobile_no": row.get("MOBILE NO", ""),
            "occupation": row.get("OCUPATION", ""),
            "blood_group": row.get("BLOOD GROUP", ""),
            "native_place": row.get("NATIVE PLACE", ""),
            "email": row.get("EMAIL", ""),
            "current_status": row.get("CURRENT STATUS", "")
        }

    # Collect multi-line address
    if row["ADDRESS"].strip():
        current["address"].append(row["ADDRESS"].strip())

# Append last record
if current:
    current["address"] = ", ".join(current["address"])
    records.append(current)

# Save JSON
with open("members.json", "w", encoding="utf-8") as f:
    json.dump(records, f, indent=2, ensure_ascii=False)

print("✅ JSON created: members.json")
