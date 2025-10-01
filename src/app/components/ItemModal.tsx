import React from 'react';
import Image from 'next/image';

interface ItemDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  ddVersion: string;
  item: Item;
}

interface Item {
    itemID: number;                 
    itemName: string;               
    itemDetail: string;             
    isActive: boolean;              
    price: number;                  
    priceTotal: number;             
    canPurchase: boolean;           
    buildFrom: number[] | null;     
    buildTo: number[] | null;       
    itemCategories: string[];       
}

const ItemModal = ({ isOpen, onClose, ddVersion, item }: ItemDetailsProps) => {
    
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}> 
            <div className="rounded-2xl shadow-2xl p-6 mx-4 bg-[#0A0A0A] text-white transition-all duration-300 border border-gray-700 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-yellow-300">{item.itemName}</h2>
                    <button
                        onClick={onClose} 
                        className="text-gray-400 hover:text-red-500 text-3xl leading-none"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-shrink-0 justify-center text-center">
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${item.itemID}.png`}
                            alt={item.itemName}
                            width={120}
                            height={120}
                            className="rounded-lg mx-auto"
                            unoptimized
                        />
                        <div className="m-3 w-3xs" dangerouslySetInnerHTML={{ __html: item.itemDetail }} />
                        <div>
                            <span className="">Price:</span>
                            <span className="text-yellow-400"> {item.price} gold</span>
                        </div>
                        
                        <div>
                            <span className="">Total Price:</span>
                            <span className="text-yellow-400"> {item.priceTotal} gold</span>
                        </div>

                        <div>
                            <span>Active ability: </span>
                            <span className={item.isActive ? "text-green-500" : "text-red-500"}>
                                {item.isActive ? "Yes" : "No"}
                            </span>
                        </div>
                    </div>
                    
                    {/* <div className="flex-1 justify-center text-center" >
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Price:</span>
                                <span className="ml-2 text-yellow-400">{item.price} gold</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Total Price:</span>
                                <span className="ml-2 text-yellow-400">{item.priceTotal} gold</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Can Purchase:</span>
                                <span className="ml-2">{item.canPurchase ? 'Yes' : 'No'}</span>
                            </div>
                            <div>
                                <span className="text-gray-400">Active:</span>
                                <span className="ml-2">{item.isActive ? 'Yes' : 'No'}</span>
                            </div>
                        </div>
                    </div> */}

                    <div>
                        {item.buildFrom && item.buildTo && (
                            <div className="justify-center text-center">
                                
                                {item.buildTo.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 ">Builds into</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mx-auto justify-items-center">
                                        {item.buildTo.map((itemID, index) => (
                                            <div
                                            className="flex flex-col items-center p-2 rounded-xl shadow-sm hover:shadow-md transition"
                                            >
                                            <Image
                                                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${itemID}.png`}
                                                alt={`Item ${itemID}`}
                                                width={60}
                                                height={60}
                                                className="rounded-lg "
                                                unoptimized
                                            />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                )}


                                {item.buildFrom.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Builds From</h3>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mx-auto justify-items-center">
                                        {item.buildFrom.map((itemID, index) => (
                                            <div
                                            className="flex flex-col items-center p-2 rounded-xl shadow-sm hover:shadow-md transition"
                                            >
                                            <Image
                                                src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${itemID}.png`}
                                                alt={`Item ${itemID}`}
                                                width={60}
                                                height={60}
                                                className="rounded-lg"
                                                unoptimized
                                            />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ItemModal;