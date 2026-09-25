import 'package:flutter/material.dart';

class Field {
  String name, variety;
  Field({required this.name, this.variety = ''});
}

class FieldsPage extends StatefulWidget {
  const FieldsPage({super.key});
  @override State<FieldsPage> createState() => _FieldsPageState();
}

class _FieldsPageState extends State<FieldsPage> {
  final fields = <Field>[];
  void addField() {
    final name = TextEditingController();
    final variety = TextEditingController();
    showDialog(context: context, builder: (_) => AlertDialog(
      title: const Text('Add Rice Field'),
      content: Column(mainAxisSize: MainAxisSize.min, children: [
        TextField(controller: name, decoration: const InputDecoration(labelText: 'Field name *')),
        TextField(controller: variety, decoration: const InputDecoration(labelText: 'Rice variety')),
      ]),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context), child: const Text('Cancel')),
        FilledButton(onPressed: () {
          if (name.text.trim().isEmpty) return;
          setState(() => fields.add(Field(name: name.text.trim(), variety: variety.text.trim())));
          Navigator.pop(context);
        }, child: const Text('Save')),
      ],
    ));
  }
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(title: const Text('My Fields', style: TextStyle(fontWeight: FontWeight.w700))),
    floatingActionButton: FloatingActionButton.extended(onPressed: addField, icon: const Icon(Icons.add), label: const Text('Add field')),
    body: fields.isEmpty ? const Center(child: Text('No fields yet. Add your first rice field.')) : ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: fields.length,
      itemBuilder: (_, i) {
        final f = fields[i];
        return Card(child: ListTile(
          leading: const CircleAvatar(child: Icon(Icons.agriculture)),
          title: Text(f.name, style: const TextStyle(fontWeight: FontWeight.w700)),
          subtitle: Text(f.variety.isEmpty ? 'Rice variety not added' : f.variety),
        ));
      },
    ),
  );
}
