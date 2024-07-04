# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
from difflib import SequenceMatcher

headers = {
    'User-Agent': 'GE MarketWatch(personal project)',
    'From': '@xchaos3 on Discord'  # This is another valid field
}

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes

@app.route('/api/item', methods=['GET'])
def get_item():
    item_id = request.args.get('item')  # Default to item ID 1203 if not provided
    print("ITEM ID is:")
    print(item_id)
    api_url = f'http://services.runescape.com/m=itemdb_oldschool/api/catalogue/detail.json?item={item_id}'
    
    response = requests.get(api_url)
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({'error': 'Unable to fetch data from external API'}), response.status_code
    

@app.route('/api/item_id', methods=['GET'])
def get_item_id():
    item_name = request.args.get('name', '').lower()  # Get item name from query parameter and convert to lowercase
    
    if not item_name:
        return jsonify({'error': 'Item name is required'}), 400
    
    # Construct API URL with user input
    print(item_name)
    api_url = f'https://secure.runescape.com/m=itemdb_oldschool/api/catalogue/items.json?category=1&alpha={item_name}&page=1'
    
    try:
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx, 5xx)
        
        data = response.json()
        print('JSON RESPONSE: ')
        print(data)
        if 'items' in data and len(data['items']) > 0:
            # Find the closest match based on item name similarity
            best_match = None
            best_similarity = 0.0
            
            for item in data['items']:
                item_name_api = item['name'].lower()
                similarity = similar(item_name, item_name_api)
                
                if similarity > best_similarity:
                    best_similarity = similarity
                    best_match = item
            
            if best_match:
                return jsonify({'item_id': best_match['id'], 'item_name': best_match['name']})
            else:
                return jsonify({'error': 'Item not found'}), 404
        else:
            return jsonify({'error': 'Item not found'}), 404
    
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 500

def similar(a, b):
    """Calculate the similarity between two strings."""
    return SequenceMatcher(None, a, b).ratio()

#####################################################################################
# RS WIKI API
#####################################################################################

@app.route('/api/instant_prices', methods=['GET'])
def get_latest_prices():
    item_id = request.args.get('item')  # Default to item ID 1203 if not provided
    print("(WIKI API)ITEM ID is:")
    print(item_id)
    #https://prices.runescape.wiki/api/v1/osrs/latest?id=${encodeURIComponent(data1.item_id)}
    wikiURL = f'https://prices.runescape.wiki/api/v1/osrs/latest?id={item_id}'
    print(wikiURL)
    response = requests.get(wikiURL, headers=headers)
    if response.status_code == 200:
        data = response.json()
        #print(data)
        if 'data' in data and item_id in data['data']:
            item_data = data['data'][item_id]
            #print(jsonify({'high': item_data['high'],'low': item_data['low']}))

            return jsonify({
                'high': item_data['high'],
                #'highTime': item_data['highTime'],
                'low': item_data['low'],
                #'lowTime': item_data['lowTime']
            })
        else:
            return jsonify({'error': 'Item data not found'}), 404
    else:
        return jsonify({'error': 'Unable to fetch data from external API'}), response.status_code
    
if __name__ == '__main__':
    app.run(debug=True)
