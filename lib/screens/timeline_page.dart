import 'package:flutter/material.dart';
class TimelinePage extends StatelessWidget {
  final DateTime? plantingDate;
  const TimelinePage({super.key, this.plantingDate});
  @override Widget build(BuildContext context) {
    final days = plantingDate == null ? null : DateTime.now().difference(plantingDate!).inDays;
    const stages = [('0–20 days','Establishment','চারা স্থাপন'),('21–50 days','Vegetative growth','শাকীয় বৃদ্ধি'),('51–80 days','Reproductive growth','প্রজনন পর্যায়'),('81–115 days','Grain filling','দানা গঠন'),('116+ days','Maturity','পরিপক্বতা')];
    final active = days == null ? -1 : days <= 20 ? 0 : days <= 50 ? 1 : days <= 80 ? 2 : days <= 115 ? 3 : 4;
    return Scaffold(appBar: AppBar(title: const Text('Crop Growth Timeline', style: TextStyle(fontWeight: FontWeight.w700))), body: ListView(padding: const EdgeInsets.all(18), children: [
      if (days == null) const Card(child: Padding(padding: EdgeInsets.all(16), child: Text('Add a planting date to a field to track its crop stage.'))),
      if (days != null) Card(child: Padding(padding: const EdgeInsets.all(16), child: Text('Estimated crop age: ' + days.toString() + ' days', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)))),
      const SizedBox(height: 14),
      ...List.generate(stages.length, (i) => Card(child: ListTile(leading: CircleAvatar(child: Text((i+1).toString())), title: Text(stages[i].$2, style: TextStyle(fontWeight: i == active ? FontWeight.w800 : FontWeight.w600)), subtitle: Text(stages[i].$1 + ' • ' + stages[i].$3), trailing: i == active ? const Chip(label: Text('Current')) : null))),
      const SizedBox(height: 8), const Text('Actual crop development varies by rice variety, season, field conditions and management.', style: TextStyle(fontSize: 12))
    ]));
  }
}
