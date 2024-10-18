from rest_framework import serializers
from .models import MenuItem, CateringOrder

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MenuItem
        fields = '__all__'


class CateringOrderSerializer(serializers.ModelSerializer):
    # Serialize menu_items as a list of IDs (this assumes menu_items is a ManyToManyField)
    menu_items = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all(), many=True)

    class Meta:
        model = CateringOrder
        fields = '__all__'

    def validate(self, attrs):
        # Get the menu items from the validated data
        menu_items = attrs.get('menu_items', [])

        # Check if any menu items were selected
        if not menu_items:
            raise serializers.ValidationError("At least one menu item must be selected.")

        # Calculate the total cost based on the selected menu items
        total_cost = sum(item.price for item in menu_items)
        attrs['total_cost'] = total_cost  # Set the total cost in the validated data

        return attrs

    def create(self, validated_data):
        # Pop the menu items from the validated data (to avoid passing them directly to CateringOrder)
        menu_items = validated_data.pop('menu_items', [])

        # Create the catering order without menu items first
        order = CateringOrder.objects.create(**validated_data)

        # Add the selected menu items to the order
        order.menu_items.set(menu_items)  # Add the many-to-many relationship items
        order.save()

        return order
