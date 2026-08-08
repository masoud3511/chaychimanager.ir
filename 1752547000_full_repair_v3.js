/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  function idFor(name, fallbackId) {
    try {
      const c = app.findCollectionByNameOrId(name);
      return c.id;
    } catch (e) {
      return fallbackId;
    }
  }

  // این دو فیلد سیستمی روی همه‌ی جدول‌ها لازم است تا مرتب‌سازی بر اساس created/-created کار کند
  const stamps = [
    { "name": "created", "type": "autodate", "onCreate": true },
    { "name": "updated", "type": "autodate", "onCreate": true, "onUpdate": true }
  ];

  const snapshot = [
    {
      "id": idFor("staff", "staff0000000001"),
      "name": "staff",
      "type": "base",
      "listRule": "", "viewRule": "", "createRule": "", "updateRule": "", "deleteRule": "",
      "fields": stamps.concat([
        { "name": "name", "type": "text", "required": true },
        { "name": "role", "type": "text" },
        { "name": "shift", "type": "text" },
        { "name": "section", "type": "text" },
        { "name": "branch", "type": "text" },
        { "name": "start_time", "type": "text" },
        { "name": "end_time", "type": "text" },
        { "name": "pin", "type": "text" },
        { "name": "initials", "type": "text" },
        { "name": "color", "type": "text" },
        { "name": "active", "type": "bool" },
        { "name": "on_leave", "type": "bool" },
        { "name": "sort_order", "type": "number" },
        { "name": "last_seen", "type": "date" },
        { "name": "photo", "type": "file", "maxSelect": 1, "maxSize": 5242880 }
      ])
    },
    {
      "id": idFor("tasks", "tasks0000000001"),
      "name": "tasks",
      "type": "base",
      "listRule": "", "viewRule": "", "createRule": "", "updateRule": "", "deleteRule": "",
      "fields": stamps.concat([
        { "name": "staff_id", "type": "text", "required": true },
        { "name": "title", "type": "text", "required": true },
        { "name": "time", "type": "text" },
        { "name": "priority", "type": "number" },
        { "name": "sort_order", "type": "number" },
        { "name": "active", "type": "bool" }
      ])
    },
    {
      "id": idFor("task_logs", "tasklogs0000001"),
      "name": "task_logs",
      "type": "base",
      "listRule": "", "viewRule": "", "createRule": "", "updateRule": "", "deleteRule": "",
      "fields": stamps.concat([
        { "name": "task_id", "type": "text", "required": true },
        { "name": "staff_id", "type": "text", "required": true },
        { "name": "date", "type": "text", "required": true },
        { "name": "done", "type": "bool" },
        { "name": "done_at", "type": "text" },
        { "name": "note", "type": "text" },
        { "name": "late", "type": "bool" },
        { "name": "photo", "type": "file", "maxSelect": 1, "maxSize": 5242880 }
      ])
    },
    {
      "id": idFor("requests", "requests000001"),
      "name": "requests",
      "type": "base",
      "listRule": "", "viewRule": "", "createRule": "", "updateRule": "", "deleteRule": "",
      "fields": stamps.concat([
        { "name": "staff_id", "type": "text", "required": true },
        { "name": "text", "type": "text", "required": true },
        { "name": "status", "type": "text" },
        { "name": "reply", "type": "text" },
        { "name": "type", "type": "text" },
        { "name": "leave_from", "type": "text" },
        { "name": "leave_to", "type": "text" }
      ])
    },
    {
      "id": idFor("messages", "messages000001"),
      "name": "messages",
      "type": "base",
      "listRule": "", "viewRule": "", "createRule": "", "updateRule": "", "deleteRule": "",
      "fields": stamps.concat([
        { "name": "to_staff_id", "type": "text" },
        { "name": "from", "type": "text" },
        { "name": "text", "type": "text", "required": true },
        { "name": "is_read", "type": "bool" }
      ])
    },
    {
      "id": idFor("attendance", "attendance000001"),
      "name": "attendance",
      "type": "base",
      "listRule": "", "viewRule": "", "createRule": "", "updateRule": "", "deleteRule": "",
      "fields": stamps.concat([
        { "name": "staff_id", "type": "text", "required": true },
        { "name": "date", "type": "text", "required": true },
        { "name": "check_in", "type": "text" },
        { "name": "check_out", "type": "text" },
        { "name": "scheduled_minutes", "type": "number" },
        { "name": "worked_minutes", "type": "number" },
        { "name": "overtime_minutes", "type": "number" },
        { "name": "overtime_reason", "type": "text" },
        { "name": "overtime_status", "type": "text" }
      ])
    },
    {
      "id": idFor("chat_messages", "chatmsgs000001"),
      "name": "chat_messages",
      "type": "base",
      "listRule": "", "viewRule": "", "createRule": "", "updateRule": "", "deleteRule": "",
      "fields": stamps.concat([
        { "name": "branch", "type": "text", "required": true },
        { "name": "staff_id", "type": "text", "required": true },
        { "name": "staff_name", "type": "text" },
        { "name": "text", "type": "text" },
        { "name": "photo", "type": "file", "maxSelect": 1, "maxSize": 8388608 },
        { "name": "voice", "type": "file", "maxSelect": 1, "maxSize": 8388608 }
      ])
    },
    {
      "id": idFor("policy", "policy0000001"),
      "name": "policy",
      "type": "base",
      "listRule": "", "viewRule": "", "createRule": "", "updateRule": "", "deleteRule": "",
      "fields": stamps.concat([
        { "name": "key", "type": "text", "required": true },
        { "name": "content", "type": "text" }
      ])
    }
  ];

  app.importCollections(snapshot, false);

  const allStaff = app.findRecordsByFilter("staff", "name ~ 'پرسنل جدید'", "", 0, 0);
  const seen = {};
  for (const rec of allStaff) {
    const key = rec.get("name");
    if (seen[key]) {
      app.delete(rec);
    } else {
      seen[key] = true;
    }
  }

  const renameMap = {
    "شعبه ۱": "پرواز",
    "شعبه ۲": "ولیعصر",
    "شعبه ۳": "شاهگلی",
    "انبار": "مرکزی"
  };
  const staffRecords = app.findRecordsByFilter("staff", "", "", 0, 0);
  for (const rec of staffRecords) {
    const old = rec.get("branch");
    if (renameMap[old]) {
      rec.set("branch", renameMap[old]);
      app.save(rec);
    } else if (!old) {
      rec.set("branch", "پرواز");
      app.save(rec);
    }
  }

  const existingPolicy = app.findRecordsByFilter("policy", "key = 'discipline_policy'", "", 1, 0);
  if (existingPolicy.length === 0) {
    const policyCollection = app.findCollectionByNameOrId("policy");
    const policyRecord = new Record(policyCollection);
    policyRecord.set("key", "discipline_policy");
    policyRecord.set("content", "متن آیین‌نامه را از پنل مدیر > تب آیین‌نامه وارد و ذخیره کن.");
    app.save(policyRecord);
  }
}, (app) => {
});
