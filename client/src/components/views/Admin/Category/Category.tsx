import DataTable from "@/components/ui/DataTable";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Category.constant";
import { CiMenuKebab } from "react-icons/ci";
import useCategory from "./useCategory";
import AddCategoryModal from "./AddCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";
import Image from "next/image";

const Category = () => {
    const { push, isReady, query } = useRouter();

    const {
        dataCategory,
        isLoadingCategory,
        isRefetchingCategory,
        refetchCategory,

        currentPage,
        currentLimit,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
        setURL,

        selectedId,
        setSelectedId,
    } = useCategory();

    const addCategoryModal = useDisclosure();
    const deleteCategoryModal = useDisclosure();

    console.log(dataCategory);

    useEffect(() => {
        if (isReady) {
            setURL();
        }
    }, [isReady]);

    const renderCell = useCallback(
        (category: Record<string, unknown>, columnKey: Key) => {
            const cellValue = category[columnKey as keyof typeof category];

            switch (columnKey) {
                case "icon":
                    return (
                        <Image src={`${cellValue}`} alt="icon" width={100} height={200} className="w-52 h-32 object-cover" />
                    );
                case "actions":
                    return (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="md" variant="light">
                                    <CiMenuKebab className="text-default-700" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem
                                    onPress={() => push(`/admin/category/${category._id}`)}
                                    key="detail-category-button"
                                >
                                    Detail Category
                                </DropdownItem>
                                <DropdownItem
                                    className="text-danger-500"
                                    key="delete-category"
                                    onPress={() => {
                                        setSelectedId(`${category._id}`);
                                        deleteCategoryModal.onOpen();
                                    }}
                                >
                                    Delete Category
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    );
                default:
                    return cellValue as ReactNode;
            }
        },
        [push],
    );

    return (
        <section>
            {Object.keys(query).length > 0 && (
                <DataTable
                    buttonTopContentLabel="Create Category"
                    columns={COLUMN_LIST_CATEGORY}
                    currentPage={Number(currentPage)}
                    data={dataCategory?.data || []}
                    emptyContent="Category is empty"
                    isLoading={isLoadingCategory || isRefetchingCategory}
                    limit={String(currentLimit)}
                    onChangeLimit={handleChangeLimit}
                    onChangePage={handleChangePage}
                    onChangeSearch={handleSearch}
                    onClearSearch={handleClearSearch}
                    onClickButtonTopContent={addCategoryModal.onOpen}
                    renderCell={renderCell}
                    totalPages={dataCategory?.pagination.totalPages}
                />
            )}
            <AddCategoryModal
                refetchCategory={refetchCategory}
                {...addCategoryModal}
            />
            <DeleteCategoryModal
                refetchCategory={refetchCategory}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                {...deleteCategoryModal}
            />
        </section>
    );
};

export default Category;
