const express = require("express");
const router = express.Router();
const members = require("../../Members");
const uuid = require("uuid/v4");

// Get all members
router.get("/", (req, res) => {
  res.json(members);
});

// Get single member
router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Create Member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid(),
    name: req.body.name,
    phone: req.body.phone,
    status: "active"
  };
  if (!newMember.name || !newMember.phone) {
    return res.status(400).json({ msg: "Please include a name and phone" });
  }

  members.push(newMember);
  res.json(members);
  //res.redirect("/");
});

// Update Member
router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.phone = updMember.phone ? updMember.phone : member.phone;
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No member with the id of ${req.params.id}` });
  }
});

module.exports = router;
