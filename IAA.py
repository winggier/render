#!/usr/bin/env python

import csv
import numpy as np
import os
from os.path import join, dirname
from dotenv import load_dotenv


dotenv_path = join(dirname(__file__), 'setting.txt')
load_dotenv(dotenv_path)

WORD_THRESHOLD_SIMILARITY = int(os.environ.get("WORD_THRESHOLD_SIMILARITY", "0"))
CHAR_THRESHOLD_SIMILARITY = int(os.environ.get("CHAR_THRESHOLD_SIMILARITY", "5"))
WORD_BASED_SIMILARITY = bool(os.environ.get("WORD_BASED_SIMILARITY", "True"))
INPUT_FILE_NAMES = os.environ.get("INPUT_FILE_NAMES", "1,2,3,4")
OUTPUT_FILE_NAME = os.environ.get("OUTPUT_FILE_NAME", "out.tsv")


class Bel_CG_Annotation:
    def __init__(self, tag: str, line: str):
        self.tag = tag
        self.line = line
        pass

    def __init__(self):
        pass

    def __str__(self):
        if self.tag:
            return ""
        if self.line == "0":
            return self.tag

        return self.tag + ", " + self.line

class Event_Annotaion:
    def __init__(self, event: str, bel_a: [Bel_CG_Annotation], bel_b: [Bel_CG_Annotation], cg_a: [Bel_CG_Annotation],
                 cg_b: [Bel_CG_Annotation]):
        self.event = event
        self.bel_a = bel_a
        self.bel_b = bel_b
        self.cg_a = cg_a
        self.cg_b = cg_b
        pass

    def __init__(self):
        pass


class Utterance_Annotation:

    def __init__(self, utter: str, annotations: [Event_Annotaion]):
        self.utter = utter
        self.annotations = annotations
        pass

    def __init__(self):
        pass


def main() -> None:
    tmp = "{}\t{}\t{}\t{}\t{}\t{}\t{}"
    input_file_names = INPUT_FILE_NAMES.split(",")
    input_files_count = len(input_file_names)

    if input_files_count < 1:
        print("Parameter Error!!\nPlease write correct setting in .env file")
        return

    tmp = "#\tUtterance\tEvent\tBel_A\tBel_B\tCG_A\tCG_B"

    arrays = []
    for file_name in input_file_names:
        # cwd = os.getcwd()
        # print(os.listdir())
        # print(file_name)
        file_annotations = read(file_name)
        arrays.append(file_annotations)

    annotators_num = len(arrays)

    with open(OUTPUT_FILE_NAME, "w") as writeout:
        print(tmp, file=writeout)
        for i in range(0, len(arrays[0])): # loop over utterances
            utter_print = True
            for j in range(annotators_num): # loop over annotators
                total_comparisons_with_j = [0 for m in range(annotators_num)]
                for k in range(j+1, annotators_num): # loop over next annotator (j+1) to the final annotator
                    total_comparisons_with_j[k] = compare_two_utter_annotations(arrays[j][i], arrays[k][i])

                for ii in reversed(range(len(arrays[j][i].annotations))): # loop over annotations of annotator j for utterence i
                    similar_events_annotations = []
                    # similar_events_annotations.add(arrays[j][i].annotations.pop(ii))
                    similar_events_annotations.append((j, i, ii))
                    for jj in range(j+1, len(total_comparisons_with_j)): # loop over next annotator (j+1) to the final annotator
                        for kk in reversed(range(len(total_comparisons_with_j[jj][ii]))): # loop over tatal_comparison_j for his ii_th annotation
                            if total_comparisons_with_j[jj][ii][kk] <= WORD_THRESHOLD_SIMILARITY:
                                # similar_events_annotations.add(arrays[jj][i].annotations.pop(kk))
                                similar_events_annotations.append((jj, i, kk))

                    # HERE I print the contents
                    if utter_print:
                        print_str = str(i+1) + "\t" + arrays[j][i].utter + "\t"
                        utter_print = False
                    else:
                        print_str = "\t\t" # no need to print repeated utterances

                    x, y, z = similar_events_annotations[0]
                    print_str = print_str + arrays[x][y].annotations[z].event + "\t"
                    bel_a_str = ''
                    bel_b_str = ''
                    cg_a_str = ''
                    cg_b_str = ''
                    not_first = False
                    for x, y, z in similar_events_annotations:
                        specific_event_annotation = arrays[x][y].annotations.pop(z)
                        bel_a_str = bel_a_str + (" | " if not_first else "") + input_file_names[x] + ": " + str([(bel.tag, bel.line) for bel in specific_event_annotation.bel_a])
                        bel_b_str = bel_b_str + (" | " if not_first else "") + input_file_names[x] + ": " + str([(bel.tag, bel.line) for bel in specific_event_annotation.bel_b])
                        cg_a_str = cg_a_str + (" | " if not_first else "") + input_file_names[x] + ": " + str([(cg.tag, cg.line) for cg in specific_event_annotation.cg_a])
                        cg_b_str = cg_b_str + (" | " if not_first else "") + input_file_names[x] + ": " + str([(cg.tag, cg.line) for cg in specific_event_annotation.cg_b])
                        not_first = True

                    print_str = print_str + bel_a_str + "\t" + bel_b_str + "\t" + cg_a_str + "\t" + cg_b_str
                    print(print_str, file=writeout)




def compare_two_utter_annotations(utter_anno1 : Utterance_Annotation, utter_anno2 : Utterance_Annotation):
    edit_distances = []
    for i in range(len(utter_anno1.annotations)):
        ith_edit_distances = []
        for j in range(len(utter_anno2.annotations)):
            if WORD_BASED_SIMILARITY:
                ith_edit_distances.append(levenshtein(utter_anno1.annotations[i].event.split(" "), utter_anno2.annotations[j].event.split(" "))) #For character based, we can remove .split(" ")
            else:
                ith_edit_distances.append(levenshtein(utter_anno1.annotations[i].event, utter_anno2.annotations[j].event)) #For character based, we can remove .split(" ")
        edit_distances.append(ith_edit_distances)

    return edit_distances

def read(fileName):
    with open(fileName, "r") as source:
        csv_file = csv.reader(source, delimiter='\t', quoting = csv.QUOTE_NONE)
        file_annotations = []
        utt_anno = Utterance_Annotation()
        event_annotation_list = []
        first_line = True

        for y in csv_file:
            # if y.find("\n") != -1:
            #     print(y)
            if len(y) >= 13:
                if len(y[0]) > 0:
                    if not first_line:
                        utt_anno.annotations = event_annotation_list
                        file_annotations.append(utt_anno)
                        utt_anno = Utterance_Annotation()
                        event_annotation_list = []
                        utt_anno.utter = y[0]
                    else:
                        utt_anno.utter = y[0]
                        first_line = False
                event_annotation_value = encode_annotation(y[4], y[12])  # We can add every label that we want!
                event_annotation_list.append(event_annotation_value)

        if len(event_annotation_list) > 0:
            utt_anno.annotations = event_annotation_list
            file_annotations.append(utt_anno)

    return file_annotations


def encode_annotation(event_str, event_annotation_str):
    event_anno = Event_Annotaion()
    event_anno.event = event_str
    anno_values = event_annotation_str.split("^")

    if len(anno_values) != 4:
        print("Annotation File Error!")
        return

    event_anno.bel_a = get_bel_cg_annotation(anno_values[0])
    event_anno.bel_b = get_bel_cg_annotation(anno_values[1])
    event_anno.cg_a = get_bel_cg_annotation(anno_values[2], True)
    event_anno.cg_b = get_bel_cg_annotation(anno_values[3], True)

    return event_anno


def get_bel_cg_annotation(bel_cg_str, is_cg=False):
    bel_cg_list = []

    values = bel_cg_str.split(",")

    if len(values) % 2 != 0:
        print("Annotation File Error!")
        return

    # For Bel, 0 for empty, 1 for CT+, 2 for CT-, 3 for PS, and 4 for NB.
    # For CG, 0 for empty, 1 for JA, 2 for IN, 3 for RT, and 4 for AM.
    for i in range (0, len(values), 2):
        bel_cg_anno = Bel_CG_Annotation()

        tag_val = str(int(values[i]) % 5)

        if not is_cg:
            if tag_val == "0":
                bel_cg_anno.tag = ""
            elif tag_val == "1":
                bel_cg_anno.tag = "CT+"
            elif tag_val == "2":
                bel_cg_anno.tag = "CT-"
            elif tag_val == "3":
                bel_cg_anno.tag = "PS"
            elif tag_val == "4":
                bel_cg_anno.tag = "NB"
        else:
            if tag_val == "0":
                bel_cg_anno.tag = ""
            if tag_val == "1":
                bel_cg_anno.tag = "JA"
            elif tag_val == "2":
                bel_cg_anno.tag = "IN"
            elif tag_val == "3":
                bel_cg_anno.tag = "RT"
            elif tag_val == "4":
                bel_cg_anno.tag = "AM"

        bel_cg_anno.line = values[i+1]
        bel_cg_list.append(bel_cg_anno)

    return bel_cg_list


def levenshtein(seq1, seq2):
    while '' in seq1:
        seq1.remove('')

    while '' in seq2:
        seq2.remove('')


    size_x = len(seq1) + 1
    size_y = len(seq2) + 1
    matrix = np.zeros ((size_x, size_y))
    for x in range(size_x):
        matrix [x, 0] = x
    for y in range(size_y):
        matrix [0, y] = y

    for x in range(1, size_x):
        for y in range(1, size_y):
            if seq1[x-1] == seq2[y-1]:
                matrix [x,y] = min(
                    matrix[x-1, y] + 1,
                    matrix[x-1, y-1],
                    matrix[x, y-1] + 1
                )
            else:
                matrix [x,y] = min(
                    matrix[x-1,y] + 1,
                    matrix[x-1,y-1] + 1,
                    matrix[x,y-1] + 1
                )
    # print (matrix)
    return (matrix[size_x - 1, size_y - 1])




if __name__ == "__main__":
    main()
